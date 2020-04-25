from time import time

from django.conf import settings
from django.contrib.auth import get_user_model, authenticate
from django.http import Http404
from django.shortcuts import render, get_object_or_404

from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

import jwt

from .serializers import *



def is_logged_in(request):
    try:
        encoded_jwt = request.headers['Token']
        decoded = jwt.decode(encoded_jwt, settings.SECRET_KEY, algorithms=['HS256'])
        user = get_user_model().objects.get(pk=decoded['userId'])
    except:
        raise AuthenticationFailed
    return user



class ListUsers(APIView):
    # """
    # * Requires token authentication.
    # * Only admin users are able to access this view.
    # """
    # authentication_classes = [authentication.TokenAuthentication]
    # permission_classes = [permissions.IsAdminUser]
    @swagger_auto_schema(
        operation_summary='Points로 회원 정렬 후 20위까지 조회'
        )
    def get(self, request):
        users = get_user_model().objects.order_by('-points')[:20]
        serializers = UserBriefSerializers(users, many=True)
        return Response(serializers.data, status=200)


class SingleUser(APIView):
    @swagger_auto_schema(
        operation_summary='회원 본인 정보 조회'
        )
    def get(self, request):
        user = is_logged_in(request)
        serializers = UserSerializers(user)
        return Response(serializers.data, status=200)

    @swagger_auto_schema(
        request_body=SignUpserializers,
        operation_summary='회원가입'
        )
    def post(self, request):
        """
        email과 username은 unique.
        가입 성공하면 status 200과 {'token': '~~~~~'} 형식으로 JWT를 반환합니다.
        이미 존재하거나 입력 형식 올바르지 않으면 {"입력 필드명": ["에러메시지 1", "에러메시지 2", ...]} 형식의 object와 status 400을 반환합니다.
        사용자가 이미 로그인한 상태이면 status 403을 반환합니다.
        """
        try:
            is_logged_in(request)
        except:  # 로그인 되어있지 않으면 회원가입 진행
            serializers = SignUpserializers(data=request.data)
            serializers.is_valid(raise_exception=True)
            user = serializers.save()
            user.set_password(serializers.data['password'])
            user = user.save()
            payload = PayloadSerializers(user)
            encoded = jwt.encode(payload.data, settings.SECRET_KEY, algorithm='HS256')
            return Response({'token': encoded}, status=200)
        return Response(status=403)

    @swagger_auto_schema(
        operation_summary='회원 정보 수정',
        operation_description='gender: 0 or 1',
        request_body=UserSerializers,
        manual_parameters=[
            openapi.Parameter(
                'Token',
                openapi.IN_HEADER,
                description='JWT',
                type=openapi.TYPE_STRING,
                required=True
                )
            ]
        )
    def put(self, request):
        user = is_logged_in(request)
        serializers = UserSerializers(data=request.data, instance=user)
        serializers.is_valid(raise_exception=True)
        serializers.save()
        return Response(status=200)

    @swagger_auto_schema(
        operation_summary='회원 탈퇴',
        manual_parameters=[
            openapi.Parameter(
                'Token',
                openapi.IN_HEADER,
                description='JWT',
                type=openapi.TYPE_STRING,
                required=True
                )
            ]
        )
    def delete(self, request):
        user = is_logged_in(request)
        user.delete()
        return Response(status=200)

@swagger_auto_schema(
    operation_summary='로그인',
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            "email": openapi.Schema(type=openapi.TYPE_STRING),
            "password": openapi.Schema(type=openapi.TYPE_STRING)
            },
        required=["email", "password"]
        )
    )
@api_view(['POST'])
def login(request):	
    user = authenticate(request=request, username=request.data.get('email'), password=request.data.get('password'))
    if user is None:
        return Response(status=401)
    payload = PayloadSerializers(user)
    encoded = jwt.encode(payload.data, settings.SECRET_KEY, algorithm='HS256')
    return Response({'token': encoded})

@swagger_auto_schema(
    operation_summary='이메일 중복 체크',
    method='get'
    )
@api_view(['GET'])
def check_duplicate_email(request, email):
	if email is None:
		return Response(data={'email': 'this field is required'}, status=400)
	try:
		get_user_model().objects.get(email=email)
	except:
		return Response(data={'exists': False}, status=200)
	return Response(data={'exists': True}, status=200)