from django.shortcuts import render
from .serializers import *
from .models import *
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework import viewsets, generics, views
from rest_framework.views import Response
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
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = (AllowAny,)
    # Adjusted permissions so that only admins can see a list of the users
    def list(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            queryset = CustomUser.objects.get(pk=request.user.id)
            serializer = self.get_serializer(queryset)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    

class UserCreate(generics.CreateAPIView):
    queryset = CustomUser.objects.all().order_by("-id")
    serializer_class = CustomUserSerializer
    permission_classes = (AllowAny,)

    # Allow account creation only from anonymous users
    def post(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        serializer = self.get_serializer
        serializer = serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                authenticate(
                    username=request.data["email"], password=request.data["password"]
                )
                token, huh = Token.objects.get_or_create(user=user)
                
                data = serializer.data
                data["token"] = token.key
                return Response(data)
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
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def create(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            collection = Collection(owner=request.user, title=request.data["title"])
            collection.save()
            serialized = CollectionSerializer(collection)
            return Response(serialized.data)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
    def retrieve(self, request, pk=None, *args, **kwargs):
        if request.user.is_authenticated:
            try:
                collection = Collection.objects.get(pk=pk)
            except:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            if collection.owner != request.user:
                return Response(status=status.HTTP_401_UNAUTHORIZED)
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
            return Response(status=status.HTTP_401_UNAUTHORIZED)


class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def get_permissions(self):
        if self.action == "list":
            self.permission_classes = [IsAdminUser]
        return super(NoteViewSet, self).get_permissions()
    
    def retrieve(self, request, pk=None, *args, **kwargs):
        if request.user.is_authenticated:
            try:
                note = Note.objects.get(pk=pk)
            except:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            serialized = self.get_serializer(note)
            res = serialized.data
            res["keywords"] = [x["keyword"] for x in res["keywords"]]
            return Response(res)
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    def create(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            print(request.data["keywords"])
            try:
                collection = Collection.objects.get(pk=request.data["collection"])
            except:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            if collection.owner != request.user:
                return Response(status=status.HTTP_401_UNAUTHORIZED)
            try:
                note = Note(collection=collection, title=request.data["title"], notes=request.data["notes"])
                note.save()
            except:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            for key in request.data["keywords"]:
                it, _ = Keyword.objects.get_or_create(keyword=key)
                note.keywords.add(it)
            serialized = NoteSerializer(note)

            #Add the keywords to the note, create them if need be.
            return Response(serialized.data)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def update(self, request, pk=None, *args, **kwargs):
        if request.user.is_authenticated:
            return super(NoteViewSet, self).update(request, *args, **kwargs)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)


            

class KeywordViewSet(viewsets.ModelViewSet):
    queryset = Keyword.objects.all()
    serializer_class = KeywordSerializer

    def list(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            serializer = self.get_serializer(self.queryset, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def create(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            keyword, _ = Keyword.objects.get_or_create(keyword=request.data["keyword"])
            try:
                note = Note.objects.get(pk=request.data["note"])
                collection = Collection.objects.get(pk=note.collection.id)
            except:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            if collection.owner != request.user:
                return Response(status=status.HTTP_401_UNAUTHORIZED)
            note.keywords.add(keyword)
            note.save()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def update(self, request, pk=None, *args, **kwargs):
        if request.user.is_authenticated:
            keyword, _ = Keyword.objects.get_or_create(keyword=request.data["keyword"])
            try:
                note = Note.objects.get(pk=pk)
            except:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            note.keywords.remove(keyword)
            note.save()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    