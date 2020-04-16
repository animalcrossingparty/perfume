from django.shortcuts import render, redirect
from .models import Perfume, Note, Category, Brand
import perfumes.utils import survey
import json
# REST framework에서 view 하나하나는 API로 작동해야함

def perfumes_list(request):
    # 리퀘스트에서 데이터를 가져온다
    data = json.load(request.body)
    # 그 데이터를 계산할 함수에 넣어서 계산한 결과를 변수에 저장한다.
    result = survey.selected_perfumes(data)
    # 저장한 변수를 시리얼라이저에 넣어서 직렬화한다.
    serialize = {
        데이ㅌ
    }
    향수 디테일
    # 시리얼라이저를 리턴한다.

def perfume_detail(request, perfume_pk):
    pass

def perfume_survey(request):
    pass

def reviews_list(request, perfume_pk):
    pass

def review_detail(request, perfume_pk, review_pk):
    pass