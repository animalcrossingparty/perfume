from rest_framework import serializers
from django.contrib.auth import get_user_model
import jwt
from perfume.settings import SECRET_KEY
from time import time
class UserSerializers(serializers.Serializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'email', 'password']

class JWTSerializers(serializers.Serializer):
    token = serializers.CharField()

'''
class MusicSerializers(serializers.ModelSerializer):
    class Meta:
        model = Music
        fields = ['id', 'title', 'artist_id']
'''