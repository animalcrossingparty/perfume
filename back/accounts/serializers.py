from rest_framework import serializers
from django.contrib.auth import get_user_model
import jwt
from laure_richis.settings import SECRET_KEY
from time import time


class UserSerializers(serializers.Serializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'email', 'password']

class PayloadSerializers(serializers.Serializer):
    userId = serializers.CharField()
    username = serializers.CharField()
    iat = serializers.DateTimeField()
    exp = serializers.DateTimeField()

class JWTSerializers(serializers.Serializer):
    token = serializers.CharField()


'''
class MusicSerializers(serializers.ModelSerializer):
    class Meta:
        model = Music
        fields = ['id', 'title', 'artist_id']
'''
