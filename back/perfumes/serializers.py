from rest_framework import serializers
from .models import Perfume, Review, Note
from accounts.serializers import UserSerializers

class NoteSerializers(serializers.Serializer):
    class Meta:
        model = Note
        fields = '__all__'

class PerfumeSerializers(serializers.ModelSerializer):
    total_review = serializers.SerializerMethodField(read_only=True)
    avg_rate = serializers.SerializerMethodField(read_only=True)
    top_notes = NoteSerializers(many=True)
    heart_notes = NoteSerializers(many=True)
    base_notes = NoteSerializers(many=True)

    class Meta:
        model = Perfume
        fields = ['id','name','launch_date','thumbnail','gender','categories','availibility','season', 'brand', 'top_notes', 'heart_notes', 'base_notes', 'total_review', 'avg_rate']

    def get_total_review(self, review):
        return review.review_set.count()

    def get_avg_rate(self, review):
        try:
            result = sum(review.review_set.values_list('rate', flat=True))/review.review_set.count()
        except:
            result = 1
        return result
class PerfumeSurveySerializers(serializers.ModelSerializer):
    class Meta:
        model = Perfume
        # fields = ['id','name','launch_date','thumbnail','gender','categories','availibility','season', 'brand', 't_notes', 'h_notes', 'b_notes', 'total_review', 'avg_rate']
        # fields = '__all__'
        fields = ['id','name', 'kor_name','launch_date','thumbnail','gender','brand', 'categories','availibility','season', 't_notes', 'h_notes', 'b_notes']
 
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