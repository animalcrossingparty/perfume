from rest_framework import serializers
from .models import Music, Artist, Review

class MusicSerializers(serializers.ModelSerializer):
    class Meta:
        model = Music
        fields = ['id', 'title', 'artist_id']

class ArtistSerializers(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ['id', 'name']

# class ArtistDetailSerializers(serializers.ModelSerializer):
#     music_set = MusicSerializers(many=True)
#     class Meta:
#         model = Artist
#         fields = ('id', 'name', 'music_set')

# 위랑 아래랑 결과가 똑같음
# 장고를 파면 팔 수록 상속을 많이받는 프레임워크라는 걸 알게 될 거임
class ArtistDetailSerializers(serializers.ModelSerializer):
    music_set = MusicSerializers(many=True)
    class Meta(ArtistSerializers.Meta):
        fields = ArtistSerializers.Meta.fields + ['music_set']

class ReviewSerializers(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['content']