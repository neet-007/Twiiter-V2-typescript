from django.contrib.auth.models import AnonymousUser
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from .models import List
from .serializers import ListSerializer
# Create your views here.
class ListViewset(ModelViewSet):
    queryset = List.objects.all()
    serializer_class = ListSerializer

    @action(methods=['patch'], detail=False)
    def follow(self, request):
        if isinstance(request.user, AnonymousUser):
            return Response({'error':'user is not authintecated'}, status=status.HTTP_401_UNAUTHORIZED)
        serialized_data = ListSerializer(request.data)
        if serialized_data.is_valid():
            return serialized_data.follow(**serialized_data.validated_data)
        return Response({'error':serialized_data.errors}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['patch'], detail=False)
    def unfollow(self, request):
        if isinstance(request.user, AnonymousUser):
            return Response({'error':'user is not authintecated'}, status=status.HTTP_401_UNAUTHORIZED)
        serialized_data = ListSerializer(request.data)
        if serialized_data.is_valid():
            return serialized_data.unfollow(**serialized_data.validated_data)
        return Response({'error':serialized_data.errors}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['patch'], detail=False)
    def add_member(self, request):
        if isinstance(request.user, AnonymousUser):
            return Response({'error':'user is not authintecated'}, status=status.HTTP_401_UNAUTHORIZED)
        serialized_data = ListSerializer(request.data)
        if serialized_data.is_valid():
            return serialized_data.add_member(**serialized_data.validated_data)
        return Response({'error':serialized_data.errors}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['patch'], detail=False)
    def remove_member(self, request):
        if isinstance(request.user, AnonymousUser):
            return Response({'error':'user is not authintecated'}, status=status.HTTP_401_UNAUTHORIZED)
        serialized_data = ListSerializer(request.data)
        if serialized_data.is_valid():
            return serialized_data.remove_member(**serialized_data.validated_data)
        return Response({'error':serialized_data.errors}, status=status.HTTP_400_BAD_REQUEST)