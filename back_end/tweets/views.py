from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from django.core.paginator import Paginator, EmptyPage
from user_auth.models import UserProfile
from user_auth.serializers import UserProfileSerlializer
from .models import Tweet, Bookmark, Like
from .serializers import TweetSerializer, BookmarkSerializer, LikeSerializer
# Create your views here.
user_model = get_user_model()

class TweetViewset(ModelViewSet):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['user'] = self.request.user

        return context

class BookmarkViewset(ModelViewSet):
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['user'] = self.request.user

        return context

class LikeViewset(ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer

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
            tweets_dict = {'next':None, 'previous':None, 'pages':1}
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