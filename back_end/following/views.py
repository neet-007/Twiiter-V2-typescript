from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from .models import Follows
from .serializers import FollowsSerializer
from user_auth.models import UserProfile
# Create your views here.

class FollowsViewset(ModelViewSet):
    queryset = Follows.objects.all()
    serializer_class = FollowsSerializer

    def create(self, request, *args, **kwargs):
        try:
            context = {'user':UserProfile.objects.get(user=self.request.user)}
        except UserProfile.DoesNotExist:
            return Response({'error':'user does not have profile'}, status=status.HTTP_400_BAD_REQUEST)

        serialized_data = FollowsSerializer(data=request.data, context=context)
        if serialized_data.is_valid():
            serialized_data.create(validated_data=serialized_data.validated_data)
            return Response({'success':''}, status=status.HTTP_201_CREATED)

        return Response({'error':serialized_data.errors}, status=status.HTTP_400_BAD_REQUEST)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        try:
            context['user'] = UserProfile.objects.get(user=self.request.user)
        except UserProfile.DoesNotExist:
            return Response({'error':'user does not have profile'}, status=status.HTTP_400_BAD_REQUEST)
        return context