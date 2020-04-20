from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import Http404
from .serializers import UserBriefSerializers, UserSerializers, PayloadSerializers
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
	
	user = authenticate(request=request, username=request.data.get('email'), password=request.data.get('password'))
	if user is None:
		return Response(status=401)
		
	payload = PayloadSerializers(user)
	encoded = {
		'token': jwt.encode(payload.data, settings.SECRET_KEY, algorithm='HS256')
		}
	return Response(data=encoded)


@swagger_auto_schema(methods=["get"], manual_params=['email'], operation_description='GET /exists/email/{email_address}')
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
	return Response(status=200)


@api_view(['GET'])
def users_list(request):
	users = get_user_model().objects.order_by('-points')[:20]
	serializers = UserBriefSerializers(users, many=True)
	return Response(serializers.data, status=200)

@api_view(['GET', 'PUT'])
def user_detail(request):
	try:
		encoded_jwt = request.headers['Token']
		decoded = jwt.decode(encoded_jwt, settings.SECRET_KEY, algorithms=['HS256'])
		user = get_user_model().objects.get(pk=decoded['userID'])
	except:  # 회원 아니면
		return Response(status=401)
	if request.method == 'GET':
		serializers = UserSerializers(user)
		return Response(serializers.data, status=200)
	# PUT
	data = request.POST
	user.username = data.get('username')
	user.profile_image = data.get('profile_image')
	user.country = data.get('country')
	user.gender = data.get('gender')
	user.age = data.get('age')
	try:
		user.save()
	except:  # 글자 수를 넘거나 뭔가 문제가 생겨서 저장이 안 되면
		return Response(status=400)
	return Response(status=200)