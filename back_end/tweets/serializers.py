from rest_framework.serializers import ModelSerializer, ValidationError
from user_auth.serializers import UserProfileSerlializer
from .models import Tweet, Bookmark, Like

class TweetSerializer(ModelSerializer):
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
        }

    def validate(self, attrs):
        if self.context.get('method') != 'GET':
            attrs['user'] = self.context.get('user')
        return super().validate(attrs)

    def create(self, validated_data):
        return self.Meta.model.objects.create_tweet(**validated_data)

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