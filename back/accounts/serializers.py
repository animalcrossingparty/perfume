from time import time
import jwt
from django.contrib.auth import get_user_model
from rest_framework import serializers
from perfumes.models import Perfume


class PerfumeBriefSerializers(serializers.ModelSerializer):
    class Meta:
        model = Perfume
        fields = ['name', 'thumbnail', 'brand']


class SignUpserializers(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = [
            'username', 'email', 'password'
            ]
        required = ['username', 'email', 'password']


class UserBriefSerializers(serializers.ModelSerializer):
    """
    사용자 랭킹 리스트에서 쓰임
    """
    reviews_cnt = serializers.IntegerField(source='review_set.count')
    thumbs_up_cnt = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = get_user_model()
        fields = [
            'username', 'points', 'profile_image', 'reviews_cnt',
            'thumbs_up_cnt'
            ]

    def get_thumbs_up_cnt(self, user):
        cnt = 0
        for review in user.review_set.prefetch_related('like_users'):
            cnt += review.like_users.count()
        return cnt
            

class UserSerializers(serializers.ModelSerializer):
    like_perfumes = PerfumeBriefSerializers(read_only=True, many=True)
    gender = serializers.IntegerField(min_value=0, max_value=1)
    class Meta:
        model = get_user_model()
        fields = [
            'username', 'date_joined', 'email', 'profile_image',
            'country', 'gender', 'age', 'like_perfumes'
            ]
        read_only_fields = ['date_joined', 'email']


class PayloadSerializers(serializers.Serializer):
    now = int(time())
    userId = serializers.CharField(source='pk')
    username = serializers.CharField()
    iat = serializers.IntegerField(default=now)
    exp = serializers.IntegerField(default=now + 7200000)