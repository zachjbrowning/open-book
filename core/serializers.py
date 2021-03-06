from rest_framework import serializers
from .models import *
from django.core.exceptions import ValidationError




# This serializer includes password. Can't be used for 
# update that doesn't include password
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id", "email", "password", "first_name", "last_name"]

    def update(self, instance, validated_data):
        instance.email = validated_data.get("email", instance.email)
        instance.first_name = validated_data.get("first_name", instance.first_name)
        instance.last_name = validated_data.get("last_name", instance.last_name)
        instance.set_password(validated_data.get("password"))
        instance.save()
        return instance
         
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = CustomUser(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response.pop('password')
        return response

# This serializer doesn't include pwd. 
class CustomUserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id", "email", "first_name", "last_name"]

    def update(self, instance, validated_data):
        instance.email = validated_data.get("email", instance.email)
        instance.first_name = validated_data.get("first_name", instance.first_name)
        instance.last_name = validated_data.get("last_name", instance.last_name)
        instance.set_password(validated_data.get("password"))
        instance.save()
        return instance 

class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = ["id", "owner", "title"]

    def update(self, instance, validated_data):
        instance.title = validated_data.get("title", instance.title)
        instance.save()
        return instance

    


class KeywordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Keyword
        fields = ["keyword"]

    
        
class NoteSerializer(serializers.ModelSerializer):
    keywords = KeywordSerializer(many=True)

    class Meta:
        model = Note 
        fields = ["id", "title", "keywords", "notes", "collection"]
        extra_kwargs = {
            "keywords": {"required": False},
        }

class NoteUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["title", "notes"]
        

    


