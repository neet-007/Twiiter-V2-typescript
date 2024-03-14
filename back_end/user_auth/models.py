from typing import Any
from django.contrib.auth.models import AbstractUser, BaseUserManager, PermissionsMixin
from django.db import models
from .utils import mail_user
from uuid import uuid4


# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self, email, password=None, *extra_fields):
        if not email:
            raise ValueError('user must provid email')

        email = self.normalize_email(email)
        user = self.model(email=email, *extra_fields)
        user.set_password()

        user.save()
        return user

    def create_superuser(self, email, password=None, *extrafield):
       user = self.create_user(email=email, password=password, *extrafield)
       user.is_staff = True
       user.is_admin = True
       user.is_superuser = True
       user.save()
       return user

class UserModel(AbstractUser, PermissionsMixin):
    username = None
    email = models.EmailField(max_length=125, unique=True)
    email_verified = models.BooleanField(default=False)

    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    REQUIRED_FIELDS = []
    USERNAME_FIELD = 'email'

    def __str__(self) -> str:
        return f'{self.email}-{self.is_staff}'

class UserProfile(models.Model):
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    user_name = models.CharField(max_length=225, db_index=True)
    mention = models.CharField(max_length=125, unique=True, db_index=True)
    bio = models.CharField(max_length=225, blank=True, null=True)
    followers = models.PositiveIntegerField(default=0)
    following = models.PositiveIntegerField(default=0)
    join_data = models.DateField(auto_now_add=True)

class VerificationTokensManager(models.Manager):
    def create(self, user:UserModel, token:uuid4) -> 'VerificationTokens':
        token_ = VerificationTokens(user=user, token=token)

        mail_user(subject='verify your email', body='', to=[user.email])

        token_.save()
        return token_

    def check_user_token(self, user:UserModel, token:uuid4) -> None:
        try:
            token_ = self.get(user=user, token=token)
        except VerificationTokens.DoesNotExist:
            return False

        token_.delete()

        return True

class VerificationTokens(models.Model):
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    token = models.UUIDField(default=uuid4)