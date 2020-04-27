from rest_framework.decorators import api_view
from perfumes.utils import wordcloud
from bs4 import BeautifulSoup
import lxml
import requests
import json
import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'laure_richis.local')

# 스케쥴 하기 위한 함수 등록
def korean_won():
    r = requests.get('https://finance.naver.com/marketindex/?tabSel=exchange#tab_section')
    soup = BeautifulSoup(r.content, 'lxml')

    get_current = soup.find("span", class_="value").get_text()
    get_current = get_current.replace(',', '')
    get_current = float(get_current)

    return get_current

def make_wordcloud():
    with open('../data/json/reviews.json', newline='', encoding='utf-8') as json_file:
        data = json.load(json_file)
    wordcloud.making_wordcloud(data)
    return 'wordcloud is updated successfully'