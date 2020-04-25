from rest_framework import serializers
from .models import Perfume, Review, Note, Brand, Base64Image
from accounts.models import Survey
from accounts.serializers import UserSerializers

class Base64ImageSerializers(serializers.ModelSerializer):
    class Meta:
        model = Base64Image
        fields = ['data']

class NoteSerializers(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'name', 'kor_name']

class BrandSerializers(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ['id', 'name']

class PerfumeSerializers(serializers.ModelSerializer):
    avg_rate = serializers.SerializerMethodField(read_only=True)
    top_notes = NoteSerializers(many=True)
    heart_notes = NoteSerializers(many=True)
    base_notes = NoteSerializers(many=True)
    total_review = serializers.IntegerField(source='review_set.count', read_only=True)
    brand = BrandSerializers()

    class Meta:
        model = Perfume
        fields = '__all__'
        include = ['avg_rate', 'total_review']

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
        fields = ['id','name','launch_date','thumbnail','gender','categories','availability','seasons', 'brand', 'top_notes', 'heart_notes', 'base_notes'] 

class SurveySerializers(serializers.ModelSerializer):
    gender = UserSerializers(source='user.gender', read_only=True)
    age = UserSerializers(source='user.age',read_only=True)

    class Meta:
        model = Survey
        fields = ['id', 'age', 'gender', 'season', 'hate_notes', 'like_notes', 'like_category']

class LeftNoteSerializers(serializers.ModelSerializer):
    # note = NoteSerializers(read_only=True, many=True)
    # top_notes = NoteSerializers(read_only=True, many=True)
    # heart_notes = NoteSerializers(read_only=True, many=True)
    # base_notes = NoteSerializers(read_only=True, many=True)
    class Meta:
        model=Note
        fields = ['id', 'name', 'kor_name']

class ReviewSerializers(serializers.Serializer):
    user = serializers.CharField(source='user.username', read_only=True)
    perfume = serializers.IntegerField(source='perfume.pk', read_only=True)
    content = serializers.CharField()
    rate = serializers.IntegerField(min_value=0, max_value=10)
    created_at = serializers.DateTimeField(read_only=True)
    like_cnt = serializers.IntegerField(source='like_users.count',read_only=True)
    images = Base64ImageSerializers(read_only=True, many=True)

    def create(self, validated_data):
        return Review.objects.create(**validated_data)

    def update(self, instance, validated_data):
        # instance.user = validated_data.get('user', instance.user)
        # instance.perfume = validated_data.get('perfume', instance.perfume)
        return instance


class PerfumeDetailSerializers(serializers.ModelSerializer):
    reviews = ReviewSerializers(many=True, source='review_set')
    top_notes = NoteSerializers(many=True)
    heart_notes = NoteSerializers(many=True)
    base_notes = NoteSerializers(many=True)
    total_review = serializers.IntegerField(source='review_set.count', read_only=True)
    avg_rate = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Perfume
        fields = '__all__'
        include = ['avg_rate', 'total_review']

    def get_avg_rate(self, review):
        try:
            result = sum(review.review_set.values_list('rate', flat=True))/review.review_set.count()
        except:
            result = 0
        return result
# class WordcloudSerializers(serializers.ModelSerializer):
#     image = Base64ImageField()

#     class Meta:
#         model=MyImageModel
#         fields= ('data','image')

#     def create(self, validated_data):
#         image=validated_data.pop('image')
#         data=validated_data.pop('data')
#         return MyImageModel.objects.create(data=data,image=image)