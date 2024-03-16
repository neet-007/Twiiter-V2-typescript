from rest_framework.serializers import ModelSerializer, ValidationError
from .models import UserModel, UserProfile

class UserSerializer(ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['pk', 'email_verified']

class UserProfileSerlializer(ModelSerializer):
    user = UserSerializer(required=False)
    class Meta:
        model = UserProfile
        fields = '__all__'
        extra_kwargs = {
            'bio':{'required':False},
            'followers':{'required':False},
            'following':{'required':False},
            'join_date':{'required':False},
        }

    def validate(self, attrs):
        attrs['user'] = self.context.get('user')
        return super().validate(attrs)