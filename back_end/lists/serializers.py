from rest_framework.serializers import ModelSerializer, ValidationError
from.models import List

class ListSerializer(ModelSerializer):
    class Meta:
        model = List
        fields = '__all__'

    def follow(self, validated_data):
        return self.Meta.model.objects.follow(**validated_data)

    def unfollow(self, validated_data):
        return self.Meta.model.objects.unfollow(**validated_data)

    def add_member(self, validated_data):
        return self.Meta.model.objects.add_member(**validated_data)

    def remove_member(self, validated_data):
        return self.Meta.model.objects.remove_member(**validated_data)