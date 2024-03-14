from rest_framework.serializers import ModelSerializer
from .models import Follows

class FollowsSerializer(ModelSerializer):
    class Meta:
        model = Follows
        fields = '__all__'
        extra_kwargs = {
            'following':{'required':False}
        }

    def validate(self, attrs):
        attrs['following'] = self.context.get('user')
        return super().validate(attrs)