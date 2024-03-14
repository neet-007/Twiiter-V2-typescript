from rest_framework.serializers import ModelSerializer, ValidationError
from .models import UserModel, UserProfile

class UserProfileSerlializer(ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'
        extra_kwargs = {
            'user':{'required':False},
            'bio':{'required':False},
            'followers':{'required':False},
            'following':{'required':False},
            'join_date':{'required':False},
        }

    def validate(self, attrs):
        attrs['user'] = self.context.get('user')
        return super().validate(attrs)