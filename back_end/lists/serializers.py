from rest_framework.serializers import ModelSerializer, ValidationError, IntegerField
from.models import List

class ListSerializer(ModelSerializer):
    follower = IntegerField(required=False)
    member = IntegerField(required=False)
    list = IntegerField(required=False)
    class Meta:
        model = List
        fields = '__all__'
        extra_kwargs = {
            'name':{'required':False},
            'description':{'required':False},
            'creator':{'required':False},
            'followers':{'required':False},
            'members':{'required':False},
            'private':{'required':False},
            'followers_num':{'required':False},
            'members_num':{'required':False},
        }

    def follow(self, validated_data):
        return self.Meta.model.objects.follow(user=self.context.get('user'), list=validated_data['list'])

    def unfollow(self, validated_data):
        return self.Meta.model.objects.unfollow(**validated_data)

    def add_member(self, validated_data):
        validated_data['member'] = validated_data.pop('member')
        return self.Meta.model.objects.add_member(**validated_data)

    def remove_member(self, validated_data):
        validated_data['member'] = validated_data.pop('member')
        return self.Meta.model.objects.remove_member(**validated_data)