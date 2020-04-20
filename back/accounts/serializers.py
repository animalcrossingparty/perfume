from rest_framework import serializers
from django.contrib.auth import get_user_model
import jwt
from laure_richis.base import SECRET_KEY
from time import time
from perfumes.models import Perfume

class PerfumeBriefSerializers(serializers.ModelSerializer):
    class Meta:
        model = Perfume
        fields = ['name', 'thumbnail', 'brand']

class UserBriefSerializers(serializers.ModelSerializer):
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
    like_perfumes = PerfumeBriefSerializers(many=True)
    class Meta:
        model = get_user_model()
        fields = [
            'username', 'date_joined', 'email', 'profile_image',
            'country', 'gender', 'age', 'points', 'like_perfumes'
            ]

class PayloadSerializers(serializers.Serializer):
    now = int(time())
    userId = serializers.CharField(source='pk')
    username = serializers.CharField()
    iat = serializers.IntegerField(default=now)
    exp = serializers.IntegerField(default=now + 7200000)
