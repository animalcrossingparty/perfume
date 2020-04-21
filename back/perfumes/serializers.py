from rest_framework import serializers
from .models import Perfume, Review, Note
from accounts.serializers import UserSerializers

class NoteSerializers(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'

class PerfumeSerializers(serializers.ModelSerializer):
    avg_rate = serializers.SerializerMethodField(read_only=True)
    top_notes = NoteSerializers(many=True)
    heart_notes = NoteSerializers(many=True)
    base_notes = NoteSerializers(many=True)
    reviews_cnt = serializers.IntegerField(source='review_set.count')

    class Meta:
        model = Perfume
        fields = '__all__'
        include = ['avg_rate', 'reviews_cnt']

    def get_avg_rate(self, review):
        try:
            result = sum(review.review_set.values_list('rate', flat=True))/review.review_set.count()
        except:
            result = 0
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