from rest_framework.serializers import ModelSerializer, BooleanField
from .models import Follows
 
class FollowsSerializer(ModelSerializer):
    unfollow = BooleanField(required=False, write_only=True)
    class Meta:
        model = Follows
        fields = '__all__'
        extra_kwargs = {
            'following':{'required':False}
        }

    def validate(self, attrs):
        attrs['following'] = self.context.get('user')
        return super().validate(attrs)

    def create(self, validated_data):
        unfollow = False
        if 'unfollow' in validated_data:
            unfollow = validated_data.pop('unfollow')
        if unfollow:
            return self.Meta.model.objects.unfollow(**validated_data)
        return self.Meta.model.objects.create(**validated_data)