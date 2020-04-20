from rest_framework import serializers
from .models import Perfume
from accounts.serializers import UserSerializers

class PerfumeSerializers(serializers.ModelSerializer):
    class Meta:
        model = Perfume
        fields = ['id','name','launch_date','thumbnail','gender','categories','availibility','season', 't_notes', 'h_notes', 'b_notes']

class ReviewDetailSerializers(serializers.Serializer):
    user = serializers.IntegerField(source='user.pk')
    perfume = serializers.IntegerField(source='perfume.pk')
    content = serializers.CharField()
    rate = serializers.IntegerField(min_value=0, max_value=10)
    created_at = serializers.DateTimeField()

class PerfumeDetailSerializers(serializers.ModelSerializer):
    reviews = ReviewDetailSerializers(many=True, source='review_set')
    class Meta:
        model = Perfume
        fields = '__all__'