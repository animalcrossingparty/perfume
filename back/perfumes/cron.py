from .models import Perfume, Review, Brand, Note
from .serializers import PerfumeSerializers, PerfumeDetailSerializers, PerfumeSurveySerializers, ReviewDetailSerializers, SurveySerializers, NoteSerializers
from rest_framework.decorators import api_view
from perfumes.utils import wordcloud
# 스케쥴 하기 위한 함수 등록

# 크론텝으로 합니당 해봅시다....
@api_view(['GET'])
def make_wordcloud(request):
    reviews = Review.objects.all()
    wordcloud.text(reviews)
    return 'wordcloud is updated successfully'

# def test_cron():
#     print(1)
#     msg = "tester"
#     print(msg)
