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
    def list(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            queryset = CustomUser.objects.get(pk=request.user.id)
            serializer = self.get_serializer(queryset)
            return Response(serializer.data)
        else:
            return Response(401)

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


class CollectionViewSet(viewsets.ModelViewSet):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer

    def list(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            queryset = Collection.objects.filter(owner=request.user.id)
            serializer = self.get_serializer(queryset, many=True)
            res = {}
            for col in serializer.data:
                res[col["title"]] = {
                    "id" : col["id"],
                    "notes" : False
                }
            return Response(res)
        else:
            return Response(401)

    def create(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            collection = Collection(owner=request.user, title=request.data["title"])
            collection.save()
            serialized = CollectionSerializer(collection)
            return Response(serialized.data)
        else:
            return Response(401)

    def retrieve(self, request, pk=None, *args, **kwargs):
        if request.user.is_authenticated:
            try:
                collection = Collection.objects.get(pk=pk)
            except:
                return Response(400)
            if collection.owner != request.user:
                return Response(403)
            serializer = self.get_serializer(collection)
            noteset = Note.objects.filter(collection=collection)
            noteser = NoteSerializer(noteset, many=True)
            res = serializer.data
            res["notes"] = {}
            for note in noteser.data:
                res["notes"][note["title"]] = {
                    "id" : note["id"],
                    "keywords" : [x["keyword"] for x in note["keywords"]],
                    "notes" : note["notes"],

                }
            return Response(res)
        else:
            return Response(401)


