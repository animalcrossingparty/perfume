from .models import Perfume, Review, Brand
from django.shortcuts import render, get_object_or_404
from .serializers import PerfumeSerializers, PerfumeDetailSerializers, ReviewDetailSerializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
import jwt
from time import time
from django.contrib.auth import get_user_model
from django.core.paginator import Paginator
from perfumes.utils import survey
from django.db.models import Q, Count, Avg
import json
from drf_yasg.utils import swagger_auto_schema
from drf_yasg.openapi import Schema


PAGE_SIZE = 12

@api_view(['GET'])
def perfumes_list(request):
    # QUERY STRINGS ----------------------------------------------
    # 필수값은 무엇인지, 기본값은 무엇인지
    sort = request.GET.get('sort', None)
    brand = request.GET.get('brand', None)
    category = request.GET.get('category', None)
    page = int(request.GET.get('page', 1))
    exclude = request.GET.get('exclude', None)
    include = request.GET.get('include', None)
    gender = request.GET.get('gender', None)
    # ------------------------------------------------------------

    
    products = Perfume.objects.prefetch_related('top_notes').prefetch_related('heart_notes').prefetch_related('base_notes')
    products = products.prefetch_related('brand').prefetch_related('review_set').annotate(review__count=Count('review')).annotate(avg_rate=Avg('review__rate')).all()

    # 성별 체크
    print(gender)
    if gender is not None:
        try:
            products = products.filter(gender=gender)
        except:
            return 0

    # 브랜드 체크
    if brand is not None:
        try:
            products = products.filter(brand__name=brand)
        except:
            return 0

    # 카테고리 체크
    if category is not None:
        try:
            products = products.filter(categories=category)
        except:
            return 0

    # 제외 노트 체크
    if exclude is not None:
        try:
            exclude_list = exclude.split(',')
            for exclude in exclude_list:
                products = products.exclude(Q(top_notes__name=exclude) | Q(heart_notes__name=exclude) | Q(base_notes__name=exclude))
        except:
            print(products)
            return 0

    # 포함 노트 체크
    if include is not None:
        try:
            include_list = include.split(',')
            for include in include_list:
                products = products.filter(Q(top_notes__name=include) | Q(heart_notes__name=include) | Q(base_notes__name=include))
        except:
            return 0

    # 정렬
    if sort is not None:
        if sort == 'alpha':
            products = products.all().order_by('name')
        elif sort == 'reviewcnt':
            products = products.order_by('-review__count')
        elif sort == 'rate':
            products = products.order_by('-avg_rate')
        else:
            products = products.order_by('name')

    # 페이지네이션
    print(products)
    try:
        paged_products = Paginator(products, PAGE_SIZE).page(page)
        print(paged_products)
        serializer = PerfumeSerializers(paged_products, many=True).data
    except: 
        # paged_products = Paginator(products, PAGE_SIZE).page(page)
        invalid_page_message = f'{page} 페이지에는 결과가 없습니다. 해당 요청의 최대 페이지 수: < {Paginator(products, PAGE_SIZE).num_pages} >'
        return Response(invalid_page_message, status=404)

    return Response(serializer)

@api_view(['GET'])
def perfume_detail(request, perfume_pk):
    perfume = Perfume.objects.get(pk=perfume_pk)
    serializer = PerfumeDetailSerializers(perfume)
    return Response(serializer.data)

def perfume_survey(request):
    survey_by_user = [{
        "gender": 0,
        "age": 23,
        "season": [0, 1, 2, 3], # 사계절
        "likes": [480, 224, 510],
        "hates": [42, 28],
        "notes": ["citrus", "kimchi", "cat", ""]
        }]
    print(survey.selected_perfumes(survey_by_user, Perfume))
    return 0

@api_view(['POST'])
def review_create(request, perfume_pk):
    try:
        encoded_jwt = request.headers['Token']
        decoded = jwt.decode(encoded_jwt, settings.SECRET_KEY, algorithms=['HS256'])
        user = get_user_model().objects.get(pk=decoded['userID'])
    except:  # 회원 아니면
        return Response(status=401)
    # 회원이면
    data = request.POST
    review = Review.objects.create(
        user=user,
        perfume_id=perfume_pk,
        content=data.get('content'),
        rate=data.get('rate')
    )
    return Response(data={'review_id': review.pk}, status=200)

@api_view(['GET', 'PUT', 'DELETE'])
def review_detail(request, perfume_pk, review_pk):
    try:  # 먼저 해당 리뷰 존재하는 지 확인
        review = Review.objects.get(pk=review_pk)
    except:
        return Response(status=404)
    # 존재하면
    if request.method == 'GET':
        serializer = ReviewDetailSerializers(review)
        return Response(serializer.data, status=200)
    # PUT / DELETE 일 때
    try:  # 회원인지 verify
        encoded_jwt = request.headers['Token']
        decoded = jwt.decode(encoded_jwt, settings.SECRET_KEY, algorithms=['HS256'])
        user_cur = get_user_model().objects.get(pk=decoded['userID'])
    except:  # 회원 아니면
        return Response(status=401)
    # 회원이면
    if user_cur != review.user:  # 작성자 본인 아니면
        return Response(status=403)
    # 작성자 본인 맞으면
    data = request.POST
    if request.method == 'PUT':
        review.content = data.get('content')
        review.rate = data.get('rate')
        try:
            review.save()
        except:  # 내용을 안 썼을 때..?
            return Response(status=400)
    else:  # DELETE일 때
        review.delete()
    return Response(status=200)
    




#  for user in get_user_model().objects.all():
#     ...:     user.set_password(1)
#     ...:     user.save()




