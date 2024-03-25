from django.db import models
from user_auth.models import UserProfile
# Create your models here.

class ListManager(models.Manager):
    def follow(self, user:UserProfile, list:str) -> 'List':
        try:
            list_ = List.objects.get(pk=list)
        except List.DoesNotExist:
            raise ValueError('list does not exist')

        list_.followers.add(user)
        list_.followers_num += 1
        list_.save()

        return list_

    def unfollow(self, user:UserProfile, list:str) -> 'List':
        try:
            list_ = List.objects.get(pk=list)
        except List.DoesNotExist:
            raise ValueError('list does not exist')

        if list_.followers.contains(user):
            list_.followers.remove(user)
            list_.followers_num -= 1
            list_.save()

        return list_

    def add_member(self, user:list[UserProfile], list:str) -> 'List':
        try:
            list_ = List.objects.get(pk=list)
        except List.DoesNotExist:
            raise ValueError('list does not exist')

        list_.members.add(user[0])
        list_.members_num += 1
        list_.save()

        return list_

    def remove_member(self, user:list[UserProfile], list:str) -> 'List':
        try:
            list_ = List.objects.get(pk=list)
        except List.DoesNotExist:
            raise ValueError('list does not exist')

        if list_.members.contains(user[0]):
            list_.members.remove(user[0])
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
