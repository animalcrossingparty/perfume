from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import Http404
from .serializers import PayloadSerializers
from django.contrib.auth import get_user_model, authenticate
from time import time
from django.conf import settings
import jwt
from drf_yasg.utils import swagger_auto_schema
from drf_yasg.openapi import Schema


@swagger_auto_schema(
    methods=['post'],
    request_body=Schema(
        title="로그인",
        type='object',
        description="우왕 로그인",

    )
)
@api_view(['POST'])
def login(request):
	'''
	로그인을 하고싶나?
	----
	username: '이메일주소'
	password: '패스워드'
	'''
	
	user = authenticate(request=request, username=request.data.get('username'), password=request.data.get('password'))
	if user is None:
		return Response(status=401)
		
	payload = PayloadSerializers(user)
	encoded = {
		'token': jwt.encode(payload.data, settings.SECRET_KEY, algorithm='HS256')
		}
	return Response(data=encoded)


@swagger_auto_schema(methods=["get"], manual_params=['email'], operation_description='GET /exists/email/{email_address}')
@api_view(['GET'])
def check_duplicate_email(request):
	email = request.GET.get('email')
	if email is None:
		return Response(data={'email': 'this field is required'}, status=400)
	try:
		get_user_model().objects.get(email=email)
	except:
		return Response(data={'email': 'success'}, status=200)
	else:
		return Response(data={'email': 'already existing email address'}, status=400)


@api_view(['POST'])
def signup(request):
	try:
		user = get_user_model().objects.create(
			email=request.data['email'],
			username=request.data['username'],
			password=1
		)
	except:
		return Response(status=400)
	user.set_password(request.data['password'])
	user.save()
	return Response(data={'signup': 'success'}, status=200)


'''
User CRUD
회원가입
User 랭킹 리스트
'''