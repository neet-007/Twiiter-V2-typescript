from rest_framework.serializers import ModelSerializer, ValidationError, SerializerMethodField
from following.models import Follows
from .models import UserModel, UserProfile

class UserSerializer(ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['pk', 'email_verified']

class UserProfileSerlializer(ModelSerializer):
    user = UserSerializer(required=False)
    is_followed = SerializerMethodField(method_name='get_is_followed')
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

    def get_is_followed(self, obj):
        try:
            user = UserProfile.objects.get(user=self.context.get('user'))
        except UserProfile.DoesNotExist:
            return False

        if obj != user:
            return Follows.objects.filter(following=user, follower=obj).exists()
        return False