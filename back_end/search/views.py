from django.core.paginator import Paginator
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from tweets.models import Tweet
from tweets.serializers import TweetSerializer
from user_auth.models import UserProfile
from user_auth.serializers import UserProfileSerlializer
from lists.models import List
from lists.serializers import ListSerializer
# Create your views here.
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
            paginator = Paginator(tweets, 10)
            page_obj = paginator.page(page)

            if page_obj.has_next():
                tweets_dict['next'] = page_obj.next_page_number()
            if page_obj.has_previous():
                tweets_dict['previous'] = page_obj.previous_page_number()

            tweets_dict['pages'] = paginator.num_pages
            tweets_dict['results'] = TweetSerializer(page_obj.object_list, many=True).data

            return_dict['tweets'] = tweets_dict

            return Response(return_dict, status=status.HTTP_200_OK)

        if filter == 'live':
            tweets = Tweet.objects.filter(text__icontains=search).order_by('-time')
            paginator = Paginator(tweets, 10)
            page_obj = paginator.page(page)

            tweets_dict = {'next':None, 'previous':None, 'pages':1, 'results':None, 'count':0}

            if page_obj.has_next():
                tweets_dict['next'] = page_obj.next_page_number()
            if page_obj.has_previous():
                tweets_dict['previous'] = page_obj.previous_page_number()
            tweets_dict['results'] = {'tweets':TweetSerializer(page_obj.object_list, many=True).data}
            tweets_dict['count'] = paginator.count

            return Response(tweets_dict, status=status.HTTP_200_OK)

        if filter == 'users':
            users = UserProfile.objects.filter(user_name__icontains=search)
            paginator = Paginator(UserProfileSerlializer(users, many=True).data, 10)
            page_obj = paginator.page(page)

            users_dict = {'next':None, 'previous':None, 'pages':1, 'results':None, 'count':0}

            if page_obj.has_next():
                users_dict['next'] = page_obj.next_page_number()
            if page_obj.has_previous():
                users_dict['previous'] = page_obj.previous_page_number()
            users_dict['pages'] = paginator.num_pages
            users_dict['results'] = {'users':UserProfileSerlializer(page_obj.object_list, many=True).data}
            users_dict['count'] = paginator.count

            return Response(users_dict, status=status.HTTP_200_OK)

        if filter == 'lists':
            lists = List.objects.filter(name__icontains=search)
            paginator = Paginator(lists, 10)
            page_obj = paginator.page(page)

            lists_dict = {'next':None, 'previous':None, 'pages':1, 'results':None, 'count':0}

            if page_obj.has_next():
                lists_dict['next'] = page_obj.next_page_number()
            if page_obj.has_previous():
                lists_dict['previous'] = page_obj.previous_page_number()
            lists_dict['pages'] = paginator.num_pages
            lists_dict['results'] = {'lists':ListSerializer(page_obj.object_list, many=True).data}
            lists_dict['count'] = paginator.count

            return Response(lists_dict, status=status.HTTP_200_OK)

        return Response({'error':'filter is not valid'}, status=status.HTTP_400_BAD_REQUEST)