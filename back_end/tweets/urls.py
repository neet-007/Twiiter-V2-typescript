from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('tweet', views.TweetViewset)
router.register('bookmark', views.BookmarkViewset)
router.register('like', views.LikeViewset)

urlpatterns = [
    path('', include(router.urls))
]