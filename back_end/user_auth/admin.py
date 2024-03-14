from django.contrib import admin
from .models import UserModel, UserProfile, VerificationTokens
# Register your models here.
admin.site.register(UserModel)
admin.site.register(UserProfile)
admin.site.register(VerificationTokens)