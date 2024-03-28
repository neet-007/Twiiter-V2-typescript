from django.contrib import admin
from .models import Tweet, Like, Bookmark, Tag
# Register your models here.
admin.site.register(Tweet)
admin.site.register(Like)
admin.site.register(Bookmark)
admin.site.register(Tag)