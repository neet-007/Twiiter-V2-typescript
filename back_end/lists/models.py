from django.db import models
from user_auth.models import UserProfile
# Create your models here.

class ListManager(models.Manager):
    def follow(self, user:int, list:int) -> 'List':
        try:
            user_= UserProfile.objects.get(user__pk=user)
        except UserProfile.DoesNotExist:
            raise ValueError('user does not exist')

        try:
            list_ = List.objects.get(pk=list)
        except List.DoesNotExist:
            raise ValueError('list does not exits')

        list_.followers.add(user_)
        list_.followers_num += 1
        list_.save()

        return list_

    def unfollow(self, user:int, list:int) -> 'List':
        try:
            user_= UserProfile.objects.get(user__pk=user)
        except UserProfile.DoesNotExist:
            raise ValueError('user does not exist')

        try:
            list_ = List.objects.get(pk=list)
        except List.DoesNotExist:
            raise ValueError('list does not exits')

        if list_.followers.contains(user_):
            list_.followers.remove(user_)
            list_.followers_num -= 1
            list_.save()

        return list_

    def add_member(self, user:int, list:int) -> 'List':
        try:
            user_= UserProfile.objects.get(user__pk=user)
        except UserProfile.DoesNotExist:
            raise ValueError('user does not exist')

        try:
            list_ = List.objects.get(pk=list)
        except List.DoesNotExist:
            raise ValueError('list does not exits')

        list_.members.add(user_)
        list_.members_num += 1
        list_.save()

        return list_

    def remove_member(self, user:int, list:int) -> 'List':
        try:
            user_= UserProfile.objects.get(user__pk=user)
        except UserProfile.DoesNotExist:
            raise ValueError('user does not exist')

        try:
            list_ = List.objects.get(pk=list)
        except List.DoesNotExist:
            raise ValueError('list does not exits')

        if list_.members.contains(user_):
            list_.members.add(user_)
            list_.members_num -= 1
            list_.save()

        return list_


class List(models.Model):
    creator = models.ForeignKey(UserProfile, on_delete=models.CASCADE, name='list_creator')
    followers = models.ManyToManyField(UserProfile, related_name='list_followers', blank=True)
    members = models.ManyToManyField(UserProfile, related_name='list_members', blank=True)
    name = models.CharField(max_length=125)
    description = models.CharField(max_length=255)
    private = models.BooleanField(default=False, blank=True)
    followers_num = models.PositiveIntegerField(default=0, blank=True)
    members_num = models.PositiveIntegerField(default=0, blank=True)

    objects = ListManager()