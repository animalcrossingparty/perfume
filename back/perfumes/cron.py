from .models import Perfume, Review, Brand, Note
from .serializers import *
from rest_framework.decorators import api_view
from perfumes.utils import wordcloud
from bs4 import BeautifulSoup
import lxml
import requests

# 스케쥴 하기 위한 함수 등록
def korean_won():
    r = requests.get('https://finance.naver.com/marketindex/?tabSel=exchange#tab_section')
    soup = BeautifulSoup(r.content, 'lxml')

    get_current = soup.find("span", class_="value").get_text()
    get_current = get_current.replace(',', '')
    get_current = float(get_current)

    return get_current
# 크론텝으로 합니당 해봅시다....
@api_view(['GET'])
def make_wordcloud(request):
    reviews = Review.objects.all()
    wordcloud.text(reviews)
    return 'wordcloud is updated successfully'