from rest_framework.serializers import ModelSerializer, ValidationError
from .models import UserModel, UserProfile

class UserProfileSerlializer(ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'