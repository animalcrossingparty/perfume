from time import time

from django.conf import settings
from django.contrib.auth import get_user_model, authenticate
from django.http import Http404
from django.shortcuts import render, get_object_or_404

from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

import jwt

from .serializers import *



def is_logged_in(request):
    encoded_jwt = request.headers['Token']
    decoded = jwt.decode(encoded_jwt, settings.SECRET_KEY, algorithms=['HS256'])
    user = get_user_model().objects.get(pk=decoded['userId'])
    return user


class ListUsers(APIView):
    """GET: 회원 랭킹
    * Requires token authentication.
    * Only admin users are able to access this view.
    """
    # authentication_classes = [authentication.TokenAuthentication]
    # permission_classes = [permissions.IsAdminUser]
    def get(self, request):
        users = get_user_model().objects.order_by('-points')[:20]
        serializers = UserBriefSerializers(users, many=True)
        return Response(serializers.data, status=200)


class SingleUser(APIView):
    def get(self, request):
        """
        회원 본인 정보 조회
        """
        try:
            user = is_logged_in(request)
        except:
            return Response(status=401)
        serializers = UserSerializers(user)
        return Response(serializers.data, status=200)

    @swagger_auto_schema(request_body=SignUpserializers)
    def post(self, request):
        """
        회원 가입 (email, username은 unique)
        """
        try:
            is_logged_in(request)
        except:  # 로그인 되어있지 않으면 회원가입 진행
            serializers = SignUpserializers(data=request.data)
            if serializers.is_valid():
                user = serializers.save()
            else:
                return Response({'message': 'already existing email or username'}, status=400)
            user.set_password(serializers.data['password'])
            user.save()
            return Response(status=200)
        return Response({'message': 'already logged in'}, status=400)

    @swagger_auto_schema(
        request_body=UserSerializers,
        manual_parameters=[
            openapi.Parameter(
                'Token',
                openapi.IN_HEADER,
                description='JWT',
                type=openapi.TYPE_STRING
                )
            ]
        )
    def put(self, request):
        """
        회원 정보 수정
        """
        try:
            user = is_logged_in(request)
        except:
            return Response(status=400)
        serializers = UserSerializers(data=request.data, instance=user)
        if serializers.is_valid():
            serializers.save()
            return Response(status=200)
        return Response({'message': 'Wrong format'}, status=400)

    def delete(self, request):
        """
        회원 탈퇴
        """
        try:
            user = is_logged_in(request)
        except:
            return Response(status=400)
        user.delete()
        return Response(status=200)

@swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            "email": openapi.Schema(type=openapi.TYPE_STRING),
            "password": openapi.Schema(type=openapi.TYPE_STRING)
            }
        )
    )
@api_view(['POST'])
def login(request):	
    print(request.data)
    user = authenticate(request=request, username=request.data.get('email'), password=request.data.get('password'))
    if user is None:
        return Response(status=401)
    payload = PayloadSerializers(user)
    encoded = {
        'token': jwt.encode(payload.data, settings.SECRET_KEY, algorithm='HS256')
        }
    return Response(data=encoded)


# @swagger_auto_schema(methods=["get"], manual_params=['email'], operation_description='GET /exists/email/{email_address}')
@api_view(['GET'])
def check_duplicate_email(request, email):
	print(email)
	if email is None:
		return Response(data={'email': 'this field is required'}, status=400)
	try:
		get_user_model().objects.get(email=email)
	except:
		return Response(data={'exists': False}, status=200)
	return Response(data={'exists': True}, status=200)