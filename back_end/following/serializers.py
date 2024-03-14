from rest_framework.serializers import ModelSerializer
from .models import Follows

class FollowsSerializer(ModelSerializer):
    class Meta:
        model = Follows
        fields = '__all__'