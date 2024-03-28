from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import AnonymousUser
from django.contrib.auth import get_user_model, authenticate, login, logout
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from .models import UserProfile, VerificationTokens
from .serializers import UserProfileSerlializer, UserSerializer, VerificationSerializer
from .utils import mail_user
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
            user = user_model.objects.create_user(email=data['email'], password=data['password'])
        except:
            print_exc()
            return Response({'error':'some error occurued please try later'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)

        VerificationTokens.objects.create(user=user)
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

    @action(methods=['get'], detail=False)
    def check_user(self, request):
        if isinstance(request.user, AnonymousUser):
            return Response({'error':'user not found'}, status=status.HTTP_200_OK)
        try:
            profile = UserProfileSerlializer(request.user.userprofile_set.all()[0]).data
        except IndexError:
            profile = None
        return Response({'success':{'user':UserSerializer(request.user).data,'profile':profile}}, status=status.HTTP_200_OK)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['user'] = self.request.user

        return context

class verify(APIView):
    def get(self, request):
        try:
            VerificationTokens.objects.filter(user=request.user).delete()
            token = VerificationTokens.objects.create(user=request.user)
            mail_user('check your email', f'follow this link to verify email http://localhost:5173/auth/verification/{token.token}', [request.user.email])
            return Response({'success':''}, status=status.HTTP_200_OK)
        except:
            return Response({'error':'error occured please try again'}, status=status.HTTP_400_BAD_REQUEST)

class check_verify(APIView):
    def post(self, request):
        serialized_data = VerificationSerializer(data=request.data, context={'user':request.user})

        if serialized_data.is_valid():
            if serialized_data.check_user_token(validated_data=serialized_data.validated_data):
                mail_user('user verified', 'your email is verified', [request.user.email])
                return Response({'success':'user verified'}, status=status.HTTP_200_OK)

            mail_user('token not found', 'follow the next link to send new token http://localhost:5173/auth/reverification/', [request.user.email])
            return Response({'error':'user does not have token'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'error':serialized_data.errors}, status=status.HTTP_400_BAD_REQUEST)