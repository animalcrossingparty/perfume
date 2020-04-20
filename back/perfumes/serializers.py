from rest_framework import serializers
from .models import Perfume, Review
from accounts.serializers import UserSerializers


class PerfumeSerializers(serializers.ModelSerializer):
    total_review = serializers.SerializerMethodField(read_only=True)
    avg_rate = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Perfume
        fields = ['id','name','launch_date','thumbnail','gender','categories','availibility','season', 'brand', 't_notes', 'h_notes', 'b_notes', 'total_review', 'avg_rate']

    def get_total_review(self, review):
        return review.review_set.count()

    def get_avg_rate(self, review):
        try:
            result = sum(review.review_set.values_list('rate', flat=True))/review.review_set.count()
        except:
            result = 1
        return result

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