from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import JWTSerializers
from django.contrib.auth import get_user_model, authenticate
from time import time
from perfume.settings import SECRET_KEY
import jwt

@api_view(['POST'])
def login(request):
    user = authenticate(request=request, username=request.data.get('username'), password=request.data.get('password'))
    if user is None: # 실패
        return Response(status=401)
    print(user.password)
    now = int(time())
    payload = {
        'userId': user.id,
        'username': user.username,
        'email': user.email,
        'iat': now,
        'exp': now + 7200000
    }
    encoded = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    serializer = JWTSerializers(data={'token':encoded})
    print(serializer.is_valid())
    return Response(data=serializer.data)