from typing import Any
from django.db import models
from django.contrib.auth import get_user_model
# Create your models here.
user_model = get_user_model()

class FollowsManager(models.Manager):
    def create(self, following:int, follower:int) -> 'Follows':
        try:
            following_=user_model.objects.get(pk=following)
        except user_model.DoesNotExist:
            raise ValueError('following user does not exist')

        try:
            follower_=user_model.objects.get(pk=follower)
        except user_model.DoesNotExist:
            raise ValueError('follower user does not exist')

        follow = Follows(following=following_, follower=follower_)
        follow.save()

        return follow

class Follows(models.Model):
    following = models.ForeignKey(user_model, on_delete=models.CASCADE, related_name='follows_following')
    follower = models.ForeignKey(user_model, on_delete=models.CASCADE, related_name='follows_followers')