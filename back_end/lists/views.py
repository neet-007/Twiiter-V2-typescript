from django.contrib.auth.models import AnonymousUser
from rest_framework import status
from django.core.paginator import Paginator
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from tweets.models import Tweet
from tweets.serializers import TweetSerializer
from user_auth.models import UserProfile
from .models import List
from .serializers import ListSerializer
# Create your views here.
class ListViewset(ModelViewSet):
    queryset = List.objects.all()
    serializer_class = ListSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        try:
            user = UserProfile.objects.get(user=self.request.user)
        except UserProfile.DoesNotExist:
            return Response({'error':'user does not have profile'}, status=status.HTTP_400_BAD_REQUEST)

        context['creator'] = user
        return context

    @action(methods=['get'], detail=False)
    def user_lists(self, request):
        pass

    @action(methods=['get'], detail=True)
    def tweets(self, request, pk):
        page = request.GET.get('page', 1)
        try:
            list = List.objects.get(pk=pk)
        except List.DoesNotExist:
            return Response({'error':'list does not exist'}, status=status.HTTP_404_NOT_FOUND)

        paginator = Paginator(Tweet.objects.filter(user__in=list.members.all()).order_by('-time'), per_page=10)
        page_obj = paginator.page(page)

        return_dict = {'count':paginator.count, 'next':None, 'previous':None, 'results':[]}

        if page_obj.has_next():
            return_dict['next'] = page_obj.next_page_number()
        if page_obj.has_previous():
            return_dict['previous'] = page_obj.previous_page_number()

        return_dict['results'] = TweetSerializer(page_obj.object_list, many=True).data

        return Response(return_dict, status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True)
    def follow(self, request, pk):
        if isinstance(request.user, AnonymousUser):
            return Response({'error':'user is not authintecated'}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            user = UserProfile.objects.get(user=request.user)
        except UserProfile.DoesNotExist:
            return Response({'error':'user does not have profile'}, status=status.HTTP_400_BAD_REQUEST)

        serialized_data = ListSerializer(data=request.data, context={'user':user, 'list':pk})
        if serialized_data.is_valid():
            return Response({'success':ListSerializer(serialized_data.follow(serialized_data.validated_data)).data}, status=status.HTTP_201_CREATED)
        return Response({'error':serialized_data.errors}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['post'], detail=True)
    def unfollow(self, request, pk):
        if isinstance(request.user, AnonymousUser):
            return Response({'error':'user is not authintecated'}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            user = UserProfile.objects.get(user=request.user)
        except UserProfile.DoesNotExist:
            return Response({'error':'user does not have profile'}, status=status.HTTP_400_BAD_REQUEST)

        serialized_data = ListSerializer(data=request.data, context={'user':user, 'list':pk})
        if serialized_data.is_valid():
            return Response({'success':ListSerializer(serialized_data.unfollow(serialized_data.validated_data)).data}, status=status.HTTP_201_CREATED)
        return Response({'error':serialized_data.errors}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['post'], detail=True)
    def add_member(self, request, pk):
        if isinstance(request.user, AnonymousUser):
            return Response({'error':'user is not authintecated'}, status=status.HTTP_401_UNAUTHORIZED)

        serialized_data = ListSerializer(data=request.data, context={'list':pk})
        if serialized_data.is_valid():
            return Response({'success':ListSerializer(serialized_data.add_member(serialized_data.validated_data)).data}, status=status.HTTP_201_CREATED)
        return Response({'error':serialized_data.errors}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['post'], detail=True)
    def remove_member(self, request, pk):
        if isinstance(request.user, AnonymousUser):
            return Response({'error':'user is not authintecated'}, status=status.HTTP_401_UNAUTHORIZED)

        serialized_data = ListSerializer(data=request.data, context={'list':pk})
        if serialized_data.is_valid():
            return Response({'success':ListSerializer(serialized_data.remove_member(serialized_data.validated_data)).data}, status=status.HTTP_201_CREATED)
        return Response({'error':serialized_data.errors}, status=status.HTTP_400_BAD_REQUEST)