from django.shortcuts import render
from .serializers import *
from .models import *
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework import viewsets, generics, views
from rest_framework.views import Response, Http404
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework import status

# Create your views here.
# Custom token authentication to allow other info to be returned
class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data["token"])
        user = CustomUser.objects.get(pk=token.user_id)
        return Response({"token": token.key, "id": token.user_id, "email":
            user.email, "first_name" : user.first_name, "last_name" : user.last_name })


# Allows updating of the user accounts, can get a list of all users
# Default permission class is authenticated with the exception of list.
# However, additional changes will need to be made to permissions and
# detection based on frontend requirements
class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all().order_by("-id")
    serializer_class = CustomUserSerializer

    # Adjusted permissions so that only admins can see a list of the users
    def get_permissions(self):
        if self.action == "list":
            self.permission_classes = [IsAdminUser]
        return super(UserViewSet, self).get_permissions()

class UserCreate(generics.CreateAPIView):
    queryset = CustomUser.objects.all().order_by("-id")
    serializer_class = CustomUserSerializer
    permission_classes = (AllowAny,)

    # Allow account creation only from anonymous users
    def post(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return Response(status=401)
        serializer = self.get_serializer
        serializer = serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                authenticate(
                    username=request.data["email"], password=request.data["password"]
                )
                token, created = Token.objects.get_or_create(user=user)
                data = serializer.data
                data["token"] = token.key
                return Response(data=data)
        return Response(serializer.errors, status=403)

# Removes the authentication token from the user, logging them out
# This solution currently does not have token expiration based on time,
# will need to be updated to account for it later
class UserLogout(APIView):
    def get(self, request):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)