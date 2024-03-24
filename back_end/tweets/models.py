from typing import Any
from django.db import models, transaction
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth import get_user_model
from user_auth.models import UserProfile
from traceback import print_exc
# Create your models here.
user_model = get_user_model()

class Tag(models.Model):
    name = models.CharField(max_length=140, unique=True, db_index=True)

    def __str__(self) -> str:
        return self.name

class TweetManager(models.Manager):
    def add_tags(self, tweet:'Tweet', tags:list[str]) -> 'Tweet':
        with transaction.atomic():
            tags_ = list(Tag.objects.filter(name__in=tags))
            if len(tags_) != len(tags):
                for tag in tags_:
                    if tag.name in tags:
                        tags.remove(tag)

                """
                tags = Tag.objects.bulk_create(tags)
                """
                tags = [Tag(name=tag) for tag in tags]
                for tag in tags:
                    tag.save()

                tags_ = tags_ + tags

                tags_ = [Tweet.tags.through(tag_id=tag.pk, tweet_id=tweet.pk) for tag in tags_]
                Tweet.tags.through.objects.bulk_create(tags_)

                return tweet

            tweet.tags.add(*tags_)
            tweet.save()

        return tweet

    def create_tweet(self, user:UserProfile, text:str, tweet_replied_to:int=None, tags_:list[str]=None) -> 'Tweet':
        if tweet_replied_to:
            try:
                tweet_replied_to_ = Tweet.objects.get(pk=tweet_replied_to)
            except Tweet.DoesNotExist:
                print_exc()
                raise Exception('error occured when creating tweet')

            tweet = Tweet(user=user, text=text, tweet_replied_to=tweet_replied_to_, is_reply=True)
            tweet.save()
            if tags_:
                self.add_tags(tweet=tweet, tags=tags_)
            return tweet

        tweet = Tweet(user=user, text=text, is_reply=False)
        tweet.save()
        if tags_:
            self.add_tags(tweet=tweet, tags=tags_)
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
    tags = models.ManyToManyField(Tag, blank=True)

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