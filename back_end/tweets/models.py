from typing import Any
from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth import get_user_model
from user_auth.models import UserProfile
from traceback import print_exc
# Create your models here.
user_model = get_user_model()

class TweetManager(models.Manager):
    def create_tweet(self, user:AbstractBaseUser, text:str, tweet_replied_to:int=None) -> 'Tweet':
        if tweet_replied_to:
            try:
                tweet_replied_to_ = Tweet.objects.get(pk=tweet_replied_to)
            except Tweet.DoesNotExist:
                print_exc()
                raise Exception('error occured when creating tweet')

            tweet = Tweet(user=user, text=text, tweet_replied_to=tweet_replied_to_, is_reply=True)
            tweet.save()
            return tweet

        tweet = Tweet(user=user, text=text, is_reply=False)
        tweet.save()
        return tweet

class Tweet(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    tweet_replied_to = models.ForeignKey('self', on_delete=models.SET_NULL, null=True)
    text = models.TextField(max_length=225)
    time = models.DateTimeField(blank=True, auto_now_add=True)
    edit_time = models.DateTimeField(blank=True, null=True, auto_now_add=True)
    likes = models.PositiveIntegerField(default=0, blank=True)
    replies = models.PositiveIntegerField(default=0, blank=True)
    bookmarks = models.PositiveIntegerField(default=0, blank=True)
    is_reply = models.BooleanField(default=False)

    objects = TweetManager()

class BookmarkManager(models.Manager):
    def create(self, user:UserProfile, tweet:Tweet) -> 'Bookmark':
        """
        try:
            tweet_ = Tweet.objects.get(pk=tweet)
        except Tweet.DoesNotExist:
            raise ValueError('tweet does not exist')
        """
        bookmark = Bookmark(user=user, tweet=tweet)
        bookmark.save()

        return bookmark

class Bookmark(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    tweet = models.ForeignKey(Tweet, on_delete=models.CASCADE)

    objects = BookmarkManager()

    def save(self, *args, **kwargs) -> None:
        self.tweet.bookmarks += 1
        self.tweet.save()
        return super().save(*args, **kwargs)

    def delete(self, *args, **kwargs) -> tuple[int, dict[str, int]]:
        if self.tweet.bookmarks > 0:
            self.tweet.bookmarks -= 1
            self.tweet.save()
        return super().delete(*args, **kwargs)

class LikeManager(models.Manager):
    def create(self, user:UserProfile, tweet:Tweet) -> 'Like':
        """
        try:
            tweet_ = Tweet.objects.get(pk=tweet)
        except Tweet.DoesNotExist:
            raise ValueError('tweet does not exist')
        """
        like = Like(user=user, tweet=tweet)
        like.save()

        return like

class Like(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    tweet = models.ForeignKey(Tweet, on_delete=models.CASCADE)

    objects = LikeManager()

    def save(self, *args, **kwargs) -> None:
        self.tweet.likes += 1
        self.tweet.save()
        return super().save(*args, **kwargs)

    def delete(self, *args, **kwargs) -> tuple[int, dict[str, int]]:
        if self.tweet.likes > 0:
            self.tweet.likes -=1
            self.tweet.save()
        return super().delete(*args, **kwargs)