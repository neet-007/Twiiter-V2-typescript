from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth import get_user_model, authenticate, login, logout
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from .models import UserProfile
from .serializers import UserProfileSerlializer
from traceback import print_exc
# Create your views here.
user_model = get_user_model()


class Register(APIView):
    def post(self, request):
        data = request.data

        if not 'email' in data:
            return Response({'error':'user must provide an email'}, status=status.HTTP_400_BAD_REQUEST)

        if not 'password' and 're_password' in data:
            return Response({'error':'user must proived password and re paassword'}, status=status.HTTP_400_BAD_REQUEST)

        if len(data['password']) < 8:
            return Response({'error':'password must be atleast 8 charectares'}, status=status.HTTP_400_BAD_REQUEST)

        if data['password'] != data['re_password']:
            return Response({'error':'password must equal re password'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user_model.objects.create_user(email=data['email'], password=data['password'])
        except:
            print_exc()
            return Response({'error':'some error occurued please try later'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)

        return Response({'success':'user created'}, status=status.HTTP_201_CREATED)

class Login(APIView):
    def post(self, request):
        data = request.data

        if not 'email' and 'password' in data:
            return Response({'error':'user must proived email and password'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, **data)
        if not user:
            return Response({'error':'no user with provided creadintilas'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            login(request, user)
        except:
            return Response({'error':'some error occured please try later'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'success':'user logged in'}, status=status.HTTP_200_OK)

class Logout(APIView):
    def get(self, request):
        try:
            logout(request)
        except:
            print_exc()
            return Response({'error':'some error occured please try later'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'success':'user logged out'}, status=status.HTTP_200_OK)

@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    def get(self, request):
        return Response({'success':'csrf token generated'}, status=status.HTTP_200_OK)

class UserProfileViewset(ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerlializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['user'] = self.request.user

        return context