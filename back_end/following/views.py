from rest_framework.viewsets import ModelViewSet
from .models import Follows
from .serializers import FollowsSerializer
# Create your views here.

class FollowsViewset(ModelViewSet):
    queryset = Follows.objects.all()
    serializer_class = FollowsSerializer