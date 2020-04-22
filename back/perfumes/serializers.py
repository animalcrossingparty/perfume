from rest_framework import serializers
from .models import Perfume, Review, Note
from accounts.models import Survey
from accounts.serializers import UserSerializers

class NoteSerializers(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'name', 'kor_name']

class PerfumeSerializers(serializers.ModelSerializer):
    avg_rate = serializers.SerializerMethodField(read_only=True)
    top_notes = NoteSerializers(read_only=True, many=True)
    heart_notes = NoteSerializers(read_only=True, many=True)
    base_notes = NoteSerializers(read_only=True, many=True)
    total_review = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Perfume
        fields = ['id','name','launch_date','thumbnail','gender','categories','availibility','season', 'brand', 'top_notes', 'heart_notes', 'base_notes', 'avg_rate', 'total_review'] 

    def get_total_review(self, review):
        return review.review_set.count()

    def get_avg_rate(self, review):
        try:
            result = sum(review.review_set.values_list('rate', flat=True))/review.review_set.count()
        except:
            result = 0
        return result

class PerfumeSurveySerializers(serializers.ModelSerializer):
    top_notes = NoteSerializers(read_only=True, many=True)
    heart_notes = NoteSerializers(read_only=True, many=True)
    base_notes = NoteSerializers(read_only=True, many=True)
    class Meta:
        model = Perfume
        fields = ['id','name','launch_date','thumbnail','gender','categories','availibility','season', 'brand', 'top_notes', 'heart_notes', 'base_notes'] 

class SurveySerializers(serializers.ModelSerializer):
    gender = UserSerializers(source='user.gender', read_only=True)
    age = UserSerializers(source='user.age',read_only=True)

    class Meta:
        model = Survey
        fields = ['id', 'age', 'gender', 'season', 'hate_notes', 'like_notes', 'like_category']

class LeftNoteSerializers(serializers.ModelSerializer):
    # notes = NoteSerializers(read_only=True, many=True)
    # top_notes = NoteSerializers(read_only=True, many=True)
    # heart_notes = NoteSerializers(read_only=True, many=True)
    # base_notes = NoteSerializers(read_only=True, many=True)
    class Meta:
        model=Note
        fields = '__all__'

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