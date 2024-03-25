from rest_framework.serializers import ModelSerializer, ValidationError, SerializerMethodField, ListField, CharField
from user_auth.serializers import UserProfileSerlializer
from user_auth.models import UserProfile
from .models import Tweet, Bookmark, Like

class UsersMentiondSerializer(ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['mention']


    def to_representation(self, instance):
        # Get the serialized data
        data = super().to_representation(instance)
        # Return only the value without the key
        return data['mention']

class TweetSerializer(ModelSerializer):
    user = UserProfileSerlializer(required=False)
    is_liked = SerializerMethodField(method_name='get_is_liked')
    is_bookmarked = SerializerMethodField(method_name='get_is_bookmarked')
    tags_ = ListField(child=CharField(max_length=140), write_only=True, required=False)
    users_mentioned_ = ListField(child=CharField(max_length=125), write_only=True, required=False)
    users_mentioned = UsersMentiondSerializer(many=True, read_only=True)
    class Meta:
        model = Tweet
        fields = '__all__'
        extra_kwargs = {
            'user':{'required':False},
            'tweet_replied_to':{'required':False},
            'time':{'read_only':True},
            'edit_time':{'read_only':True},
            'likes':{'read_only':True},
            'relpies':{'read_only':True},
            'bookmarks':{'read_only':True},
            'is_reply':{'read_only':True},
            'tags':{'read_only':True},
        }

    def validate(self, attrs):
        if self.context.get('method') != 'GET':
            attrs['user'] = self.context.get('user')
        return super().validate(attrs)

    def create(self, validated_data):
        return self.Meta.model.objects.create_tweet(**validated_data)

    def get_is_liked(self, obj):
        if not self.context.get('user_get'):
            return False
        return Like.objects.filter(user=self.context.get('user_get'), tweet=obj).exists()

    def get_is_bookmarked(self, obj):
        if not self.context.get('user_get'):
            return False
        return Bookmark.objects.filter(user=self.context.get('user_get'), tweet=obj).exists()

class CommmentsSerializer(ModelSerializer):
    class Meta:
        model = Tweet
        fields = ['user', 'tweet_replied_to', 'text']
        extra_kwargs = {'user':{'read_only':True},
                        'tweet_replied_to':{'read_only':True},}

    def validate(self, attrs):
        attrs['user'] = self.context.get('user')
        attrs['tweet_replied_to'] = self.context.get('tweet_replied_to')
        return super().validate(attrs)

    def create(self, validated_data):
        return self.Meta.model.objects.create_tweet(**validated_data)


class BookmarkSerializer(ModelSerializer):
    class Meta:
        model = Bookmark
        fields = '__all__'
        extra_kwargs = {
            'user':{'required':False}
        }

    def validate(self, attrs):
        attrs['user'] = self.context.get('user')
        return super().validate(attrs)

class LikeSerializer(ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'
        extra_kwargs = {
            'user':{'required':False}
        }

    def validate(self, attrs):
        attrs['user'] = self.context.get('user')
        return super().validate(attrs)