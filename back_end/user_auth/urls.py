from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('user-profile', views.UserProfileViewset)

urlpatterns = [
    path('register', views.Register.as_view(), name='register'),
    path('login', views.Login.as_view(), name='login'),
    path('logout', views.Logout.as_view(), name='logout'),
    path('csrf-token', views.GetCSRFToken.as_view(), name='csrf-token'),
    path('', include(router.urls))
]
