from django.db import models
from django.contrib.auth import get_user_model
from user_auth.models import UserProfile
# Create your models here.
user_model = get_user_model()

class FollowsManager(models.Manager):
    def create(self, following:UserProfile, follower:UserProfile) -> 'Follows':
        """"
        try:
            following_=UserProfile.objects.get(pk=following)
        except UserProfile.DoesNotExist:
            raise ValueError('following user does not exist')

        try:
            follower_=UserProfile.objects.get(pk=follower)
        except UserProfile.DoesNotExist:
            raise ValueError('follower user does not exist')
        """
        follow = Follows(following=following, follower=follower)
        follow.save()

        follower.followers += 1
        following.following += 1
        follower.save()
        following.save()

        return follow

    def unfollow(self, following:UserProfile, follower:UserProfile) -> 'Follows':
        try:
            follow = Follows.objects.get(following=following, follower=follower)
        except Follows.DoesNotExist:
            raise ValueError('user does not follow')

        follow.delete()
        follower.followers -= 1
        following.following -= 1
        follower.save()
        following.save()

        return True

class Follows(models.Model):
    following = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='follows_following')
    follower = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='follows_followers')

    objects = FollowsManager()