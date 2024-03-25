from rest_framework.serializers import ModelSerializer, ValidationError, IntegerField, SerializerMethodField
from user_auth.serializers import UserProfileSerlializer
from.models import List

class ListSerializer(ModelSerializer):
    list_creator = UserProfileSerlializer(required=False, read_only=True)
    is_followed = SerializerMethodField(method_name='get_is_followed')
    class Meta:
        model = List
        fields = '__all__'
        extra_kwargs = {
            'name':{'required':False},
            'description':{'required':False},
            'followers':{'required':False},
            'members':{'required':False},
            'private':{'required':False},
            'followers_num':{'required':False},
            'members_num':{'required':False},
        }

    def validate(self, attrs):
        attrs['list_creator'] = self.context.get('creator')
        return super().validate(attrs)

    def follow(self, validated_data):
        return self.Meta.model.objects.follow(user=self.context.get('user'), list=self.context.get('list'))

    def unfollow(self, validated_data):
        return self.Meta.model.objects.unfollow(user=self.context.get('user'), list=self.context.get('list'))

    def add_member(self, validated_data):
        #validated_data['member'] = validated_data.pop('member')
        return self.Meta.model.objects.add_member(user=validated_data['members'], list=self.context.get('list'))

    def remove_member(self, validated_data):
        #validated_data['member'] = validated_data.pop('member')
        return self.Meta.model.objects.remove_member(user=validated_data['members'], list=self.context.get('list'))

    def get_is_followed(self, obj):
        return obj.followers.filter(user=self.context.get('userr')).exists()