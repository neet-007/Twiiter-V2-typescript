from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from django.core.paginator import Paginator, EmptyPage
from user_auth.models import UserProfile
from user_auth.serializers import UserProfileSerlializer
from .models import Tweet, Bookmark, Like, Tag
from .serializers import TweetSerializer, BookmarkSerializer, LikeSerializer, CommmentsSerializer, TagSerializer
from .pagination import TweetsPaginator
from following.models import Follows
# Create your views here.
user_model = get_user_model()

class TweetViewset(ModelViewSet):
    queryset = Tweet.objects.all().order_by('-time')
    serializer_class = TweetSerializer
    pagination_class = TweetsPaginator

    @action(methods=['get'], detail=False)
    def main_page(self, request):
        page = request.GET.get('page', 1)
        type = request.GET.get('type', 'for-you')

        user_ = None

        if isinstance(request.user, user_model):
            try:
                user_ = UserProfile.objects.get(user=request.user)
            except UserProfile.DoesNotExist:
                user_ = None

        if type == 'for-you' or (type == 'following' and user_):
            paginator = Paginator(Tweet.objects.all().order_by('-time'), per_page=20)
        elif type == 'following' and user_:
            try:
                user = UserProfile.objects.get(user=request.user)
            except UserProfile.DoesNotExist:
                return Response({'error':'user does not have user profile'}, status=status.HTTP_400_BAD_REQUEST)

            users_list = [follow.follower for follow in Follows.objects.filter(following=user)]
            paginator = Paginator(Tweet.objects.filter(user__in=users_list), per_page=20)
        else:
            return Response({'error':'type is not supported'}, status=status.HTTP_400_BAD_REQUEST)

        return_dict = {'next':None, 'previous':None, 'count':paginator.count, 'results':[], 'pages':paginator.num_pages}
        page_obj = paginator.page(page)

        if page_obj.has_next():
            return_dict['next'] = page_obj.next_page_number()
        if page_obj.has_previous():
            return_dict['previous'] = page_obj.previous_page_number()
        return_dict['results'] = TweetSerializer(page_obj.object_list, many=True, context={'user_get':user_}).data

        return Response(return_dict, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=False)
    def trending(self, request):
        users = UserProfile.objects.all()[:3]
        trends = Tag.objects.all()[:5]

        return Response({'users':UserProfileSerlializer(users, many=True).data, 'trends':TagSerializer(trends, many=True).data}, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=False)
    def profile(self, request):
        page = request.GET.get('page', 1)
        filter = request.GET.get('f', 'posts')
        user_mention = request.GET.get('user-mention')

        try:
            user_ = UserProfile.objects.get(mention=user_mention.replace('/', ''))
        except:
            return Response({'error':'user not found'}, status=status.HTTP_404_NOT_FOUND)

        return_dict = {'user':{}, 'results':[], 'next':None, 'previous':None, 'page':page}

        tweets = Tweet.objects.none()
        is_liked = False
        if filter == 'posts':
            tweets = Tweet.objects.filter(user=user_, is_reply=False)

        if filter == 'likes':
            tweets = [tweet.tweet for tweet in Like.objects.filter(user=user_).prefetch_related('tweet')]
            is_liked = True

        if filter == 'replies':
            Tweet.objects.filter(user=user_)

        paginator = Paginator(tweets, per_page=10)
        page_obj = paginator.page(page)

        if page_obj.has_next():
            return_dict['next'] = page_obj.next_page_number()
        if page_obj.has_previous():
            return_dict['previous'] = page_obj.previous_page_number()

        return_dict['user'] = UserProfileSerlializer(user_, context={'user':request.user}).data
        return_dict['results'] = TweetSerializer(page_obj.object_list, many=True, context={'user_get':user_, 'is_liked':is_liked}).data

        return Response(return_dict, status=status.HTTP_200_OK)

    @action(methods=['get', 'post'], detail=True)
    def comments(self, request, pk):
        if request.method == 'GET':
            page = request.GET.get('page', 1)

            paginator = Paginator(Tweet.objects.filter(is_reply=True, tweet_replied_to__pk=pk).order_by('-time'), per_page=10)
            page_obj = paginator.page(page)

            return_dict = {'count':paginator.count, 'next':None, 'previous':None, 'results':[]}

            if page_obj.has_next():
                return_dict['next'] = page_obj.next_page_number()
            if page_obj.has_previous():
                return_dict['previous'] = page_obj.previous_page_number()

            return_dict['results'] = TweetSerializer(page_obj.object_list, many=True).data

            return Response(return_dict, status=status.HTTP_200_OK)

        if isinstance(request.user, AnonymousUser):
            return Response({'error':'user is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            user = UserProfile.objects.get(user=request.user)
        except UserProfile.DoesNotExist:
            return Response({'error':'userprofile does not exist'}, status=status.HTTP_400_BAD_REQUEST)

        serialized_data = CommmentsSerializer(data=request.data, context={'user':user, 'tweet_replied_to':pk})

        if serialized_data.is_valid():
            comment = serialized_data.create(serialized_data.validated_data)
            return Response(TweetSerializer(comment).data, status=status.HTTP_201_CREATED)

        return Response({'error':serialized_data.errors}, status=status.HTTP_400_BAD_REQUEST)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        if self.request.method != 'GET':
            try:
                context['user'] = UserProfile.objects.get(user=self.request.user)
            except UserProfile.DoesNotExist:
                return Response({'error':'user does not have profile'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            context['user_get'] = UserProfile.objects.get(user=self.request.user)
        except UserProfile.DoesNotExist:
            context['user_get'] = None
        context['method'] = self.request.method

        return context

class BookmarkViewset(ModelViewSet):
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer

    def create(self, request, *args, **kwargs):
        try:
            user= UserProfile.objects.get(user=request.user)
        except UserProfile.DoesNotExist:
            return Response({'error':'user does nto have profile'})

        try:
            tweet = Tweet.objects.get(pk=request.data['tweet'])
        except Tweet.DoesNotExist:
            return Response({'error':'tweet does not exist'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            bookmark = Bookmark.objects.get(user=user, tweet=tweet)
        except Bookmark.DoesNotExist:
            Bookmark.objects.create(user=user, tweet=tweet)
            return Response({'tweet_id':tweet.pk}, status=status.HTTP_201_CREATED)

        bookmark.delete()

        return Response({'tweet_id':tweet.pk}, status=status.HTTP_201_CREATED)

    @action(methods=['get'], detail=False)
    def user(self, request):
        page = request.GET.get('page', 1)

        if isinstance(request.user, AnonymousUser):
            return Response({'error':'user is not authenticated'}, status=status.HTTP_403_FORBIDDEN)

        try:
            user = UserProfile.objects.get(user=request.user)
        except UserProfile.DoesNotExist:
            return Response({'error':'user does not have profile'}, status=status.HTTP_400_BAD_REQUEST)

        tweets = Bookmark.objects.filter(user=user).prefetch_related('tweet')
        tweets = [tweet.tweet for tweet in tweets]

        paginator = Paginator(tweets, per_page=20)
        page_obj = paginator.page(page)

        return_dict = {'next':None, 'previous':None, 'results':TweetSerializer(page_obj.object_list, many=True, context={'is_bookmarked':True, 'user_get':user}).data, 'count':paginator.count, 'pages':paginator.num_pages}

        if page_obj.has_next():
            return_dict['next'] = page_obj.next_page_number()
        if page_obj.has_previous():
            return_dict['previous'] = page_obj.previous_page_number()

        return Response(return_dict, status=status.HTTP_200_OK)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['user'] = self.request.user

        return context

class LikeViewset(ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer

    def create(self, request, *args, **kwargs):
        try:
            user = UserProfile.objects.get(user=request.user)
        except UserProfile.DoesNotExist:
            return Response({'error':'user does not have profile'} ,status=status.HTTP_401_UNAUTHORIZED)
        try:
            tweet = Tweet.objects.get(pk=request.data['tweet'])
        except Tweet.DoesNotExist:
            return Response({'error':'tweet does not exist'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            like = Like.objects.get(user=user, tweet=tweet)
        except Like.DoesNotExist:
            Like.objects.create(user=user, tweet=tweet)
            return Response({'tweet_id':tweet.pk}, status=status.HTTP_201_CREATED)

        like.delete()

        return Response({'tweet_id':tweet.pk}, status=status.HTTP_201_CREATED)

    @action(methods=['get'], detail=False)
    def user(self, request):
        page = request.GET.get('page', 1)
        user = request.GET.get('user')

        if not user:
            if isinstance(request.user, AnonymousUser):
                return Response({'error':'user does not exists'}, status=status.HTTP_404_NOT_FOUND)
        user = request.user

        try:
            user = UserProfile.objects.get(user=user)
        except UserProfile.DoesNotExist:
            return Response({'error':'user does not have profile'}, status=status.HTTP_400_BAD_REQUEST)

        tweets = Like.objects.filter(user=user).prefetch_related('tweet')
        tweets = [tweet.tweet for tweet in tweets]

        paginator = Paginator(tweets, per_page=20)
        page_obj = paginator.page(page)

        return_dict = {'next':None, 'previous':None, 'results':TweetSerializer(page_obj.object_list, many=True).data, 'count':paginator.count, 'pages':paginator.num_pages}

        if page_obj.has_next():
            return_dict['previous'] = page_obj.next_page_number()
        if page_obj.has_previous():
            return_dict['previous'] = page_obj.previous_page_number()

        return Response(return_dict, status=status.HTTP_200_OK)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['user'] = self.request.user

        return context

class Search(APIView):
    def get(self, request):
        search = request.GET.get('q')
        filter = request.GET.get('f')
        page = request.GET.get('p', 1)

        if not filter:
            tweets = Tweet.objects.filter(text__icontains=search)
            users = UserProfile.objects.filter(user_name__icontains=search)[:3]

            return_dict = {'users':{'next':None, 'previous':None, 'pages':1, 'results':UserProfileSerlializer(users, many=True).data}}
            tweets_dict = {'next':None, 'previous':None, 'pages':1, 'results':[]}
            paginator = Paginator(TweetSerializer(tweets, many=True).data, 10)
            page_obj = paginator.page(page)

            if page_obj.has_next():
                tweets_dict['next'] = page_obj.next_page_number()
            if page_obj.has_previous():
                tweets_dict['previous'] = page_obj.previous_page_number()

            tweets_dict['pages'] = page_obj.count()
            tweets_dict['results'] = page_obj.object_list

            return_dict['tweets'] = tweets_dict

            return Response({'success':return_dict}, status=status.HTTP_200_OK)

        if filter == 'live':
            tweets = Tweet.objects.filter(text__icontains=search).order_by('-time')
            paginator = Paginator(TweetSerializer(tweets, many=True).data, 10)
            page_obj = paginator.page(page)

            tweets_dict = {'next':None, 'previous':None, 'pages':1}

            if page_obj.has_next():
                tweets_dict['next'] = page_obj.next_page_number()
            if page_obj.has_previous():
                tweets_dict['previous'] = page_obj.previous_page_number()

            return Response({'success':{'tweets':tweets_dict}}, status=status.HTTP_200_OK)

        if filter == 'user':
            users = user_model.objects.filter(user_name__icontains=search)
            paginator = Paginator(UserProfileSerlializer(users, many=True).data, 10)
            page_obj = paginator.page(page)

            users_dict = {'next':None, 'previous':None, 'pages':1}

            if page_obj.has_next():
                users_dict['next'] = page_obj.next_page_number()
            if page_obj.has_previous():
                users_dict['previous'] = page_obj.previous_page_number()
            users_dict['pages'] = page_obj.count()

            return Response({'success':{'users'}})

        if filter == 'list':
            return Response({'error':'not impleamnted yet'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)