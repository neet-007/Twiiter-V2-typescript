from django.db import models
from django.contrib.auth import get_user_model
from user_auth.models import UserProfile
# Create your models here.
user_model = get_user_model()

class FollowsManager(models.Manager):
    def create(self, following:int, follower:int) -> 'Follows':
        try:
            following_=UserProfile.objects.get(pk=following)
        except UserProfile.DoesNotExist:
            raise ValueError('following user does not exist')

        try:
            follower_=UserProfile.objects.get(pk=follower)
        except UserProfile.DoesNotExist:
            raise ValueError('follower user does not exist')

        follow = Follows(following=following_, follower=follower_)
        follow.save()

        follower_.following += 1
        following_.following += 1
        follower_.save()
        following_.save()

        return follow

class Follows(models.Model):
    following = models.ForeignKey(user_model, on_delete=models.CASCADE, related_name='follows_following')
    follower = models.ForeignKey(user_model, on_delete=models.CASCADE, related_name='follows_followers')