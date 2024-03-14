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

    def get_serializer_context(self):
        context = super().get_serializer_context()
        try:
            context['user'] = UserProfile.objects.get(user=self.request.user)
        except UserProfile.DoesNotExist:
            return Response({'error':'user does not have profile'}, status=status.HTTP_400_BAD_REQUEST)
        return context