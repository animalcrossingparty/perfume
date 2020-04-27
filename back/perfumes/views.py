from .models import Perfume, Review, Brand, Note, Image
from accounts.models import Survey
from django.shortcuts import render, get_object_or_404
from .serializers import *
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings
import jwt
from time import time
from django.contrib.auth import get_user_model
from django.core.paginator import Paginator
from perfumes.utils import knn, tf_idf, exchange_rate
from django.db.models import Q, Count, Avg, F
import json
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from time import time
from django.http import Http404, QueryDict
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from accounts.views import is_logged_in
import base64
import os
from PIL import Image as PILImage
from django.conf import settings
import random
from django.core.files.images import File
# from perfumes.utils import wordcloud

PAGE_SIZE = 12

@api_view(['GET', 'POST'])
def perfume_survey(request):
    if request.method == 'GET':
        famous_notes =[
                [],
                [96, 155, 227, 388, 515, 522, 530, 562, 660],
                [16, 45, 51, 75, 118, 207, 245, 272, 281, 390, 416, 491, 541, 565, 593, 694, 765, 858, 911],
                [2, 161, 201, 208, 353, 358, 426, 444, 461, 512, 785],
                [472, 527],
                [19, 48, 82, 194, 197, 323, 379, 392, 395, 604, 688, 692, 793],
                [224, 247, 376, 668, 708, 846, 908, 920],
                [100, 129, 137, 146, 168, 176, 268, 283, 289, 300, 433, 571],
                [74, 270, 336, 428, 647, 808],
                [73,778, 889],
                [26, 71, 205, 599, 624],
                [88, 124, 173, 203, 274],
                [113, 539, 747]
            ]
        famous_brands =[
                    1241, 1238, 1624, 2153, 864, 1708, 1713, 1724, 1816, 2023, 1934, 
                    2097, 2626, 528, 527, 390, 391, 647, 648, 260, 40, 215, 936, 1504, 
                    1543, 1517, 555, 687, 678, 1418, 1525, 2706, 2446, 16, 2326, 3046, 
                    614, 653, 1122, 293, 749, 532, 855, 1733, 3130, 2495, 3227, 3032, 
                    1315, 1191, 2326, 1240, 1200, 2036, 3140, 2104
                ]
        gender = request.GET.get('gender', 'all')
        age = request.GET.get('age', None)
        age = str(age)
        seasons = request.GET.get('season', None)
        category = request.GET.get('category', None)
        category = list(map(int, category.split(',')))
        notes = request.GET.get('notes', None)
        notes = list(map(int, notes.split(',')))
        products = Perfume.objects.all().prefetch_related('seasons').prefetch_related('brand').prefetch_related('top_notes').prefetch_related('heart_notes').prefetch_related('base_notes').prefetch_related('categories').filter(availability=True)
        print(products)
        products = products.filter(gender=gender)
        print('gender_filtered***********', products)
        if seasons is not None:
            season_list = seasons.split(',')
            products = products.filter(seasons__in=season_list)
        print('season_filtered***********', products)
        products = products.filter(categories__in=category)
        print('category_filtered***********', products)
        # 유명 노트 포함 향수 필터링
        products = products.filter(brand__in=famous_brands)
        print('brand_filtered***********', products)
        # sort => include_note 많이 가지고 있는 애들부터 보여주기
        notes_list = []
        for num in category:
            notes_list += famous_notes[num]
        products = products.annotate(all_notes=(F('top_notes') + F('heart_notes') + F('base_notes'))).filter(all_notes__in=notes)
        products = products.annotate(all_notes=(F('top_notes') + F('heart_notes') + F('base_notes'))).annotate(score=Count('all_notes', filter=Q(all_notes__in=notes_list))).filter(score__gt=0).order_by('-score')
        if len(products) > 15:
            products = products[:15]
        print('final_filtered***********', products)
        serializer = PerfumeSerializers(products, many=True)
        return Response(serializer.data)
    else:
        user = is_logged_in(request)
        gender = request.POST.get('gender', None)
        age = request.POST.get('age', None)
        seasons = request.POST.get('seasons', None)
        like_category = request.POST.get('like_category', None)
        include_notes = request.POST.get('include_notes', None)

        # 조사 결과 db에 저장
        survey = Survey.objects.create(
            user=user,
            seasons=seasons,
            like_category=like_category,
            like_notes=include_notes,
        )
        survey.save()

        return Response(survey, status=200)

@api_view(['GET'])
def perfumes_list(request):
    # QUERY STRINGS ----------------------------------------------
    # 필수값은 무엇인지, 기본값은 무엇인지
    sort = request.GET.get('sort', 'alpha')
    category = request.GET.get('category', 'all')
    page = int(request.GET.get('page', 1))
    brand_name = request.GET.get('brand_name', 'all')
    exclude = request.GET.get('exclude', None)
    include = request.GET.get('include', 'all')
    gender = request.GET.get('gender', 'all')
    # ------------------------------------------------------------

    products = Perfume.objects.filter(availability=True).prefetch_related('review_set').annotate(review__count=Count('review')).annotate(avg_rate=Avg('review__rate')).all()

    # 성별 체크
    print(gender)
    if gender != 'all':
        try:
            products = products.filter(gender=gender)
        except:
            return 0

# 브랜드 이름이랑 아이디, 총 페이지 숫자
    # 브랜드 체크
    if brand_name != 'all':
        try:
            products = products.filter(brand_name__name=brand_name)
        except:
            return 0

    # 카테고리 체크
    if category != 'all':
        try:
            products = products.filter(categories=category)
        except:
            return 0

    # 제외 노트 체크
    if exclude != None:
        try:
            exclude_list = exclude.split(',')
            for exclude in exclude_list:
                products = products.exclude(Q(top_notes__name=exclude) | Q(heart_notes__name=exclude) | Q(base_notes__name=exclude))
        except:
            print(products)
            return 0

    # 포함 노트 체크
    if include != 'all':
        try:
            include_list = include.split(',')
            for include in include_list:
                products = products.filter(Q(top_notes__name=include) | Q(heart_notes__name=include) | Q(base_notes__name=include))
        except:
            return 0

    # 정렬
  
    if sort == 'alpha':
        products = products.all().order_by('name')
    elif sort == 'reviewcnt':
        products = products.filter(review__count__gt=10)
        products = products.order_by('-review__count')
    elif sort == 'rate':
        products = products.order_by('-avg_rate')
    elif sort == 'price_cheap':
        products = products.order_by('price')
    elif sort == 'price_expensive':
        products = products.order_by('-price')
    else:
        products = products.order_by('name')

    # 페이지네이션
    print(products)
    try:
        paged_products = Paginator(products, PAGE_SIZE).page(page)
        print(paged_products)
        num_pages = Paginator(products, PAGE_SIZE).num_pages
        print('페이지 수',num_pages)
        serializer = PerfumeSerializers(paged_products, many=True).data
    except: 
        invalid_page_message = f'{page} 페이지에는 결과가 없습니다. 해당 요청의 최대 페이지 수: < {Paginator(products, PAGE_SIZE).num_pages} >'
        return Response(invalid_page_message, status=404)

    return Response(serializer, headers={'num_pages': num_pages, 'Access-Control-Expose-Headers': 'num_pages'})


# 성별, 나이, 계절을 받았을 때 남아있는 향수들의 노트를 알려준다 -> include, exclude 카테고리를 받는다. -> note를 리턴
@api_view(['GET'])
def left_notes(request):
    print("start!")
    famous_notes =[
                [],
                [96, 155, 227, 388, 515, 522, 530, 562, 660],
                [16, 45, 51, 75, 118, 207, 245, 272, 281, 390, 416, 491, 541, 565, 593, 694, 765, 858, 911],
                [2, 161, 201, 208, 353, 358, 426, 444, 461, 512, 785],
                [472, 527],
                [19, 48, 82, 194, 197, 323, 379, 392, 395, 604, 688, 692, 793],
                [224, 247, 376, 668, 708, 846, 908, 920],
                [100, 129, 137, 146, 168, 176, 268, 283, 289, 300, 433, 571],
                [74, 270, 336, 428, 647, 808],
                [73,778, 889],
                [26, 71, 205, 599, 624],
                [88, 124, 173, 203, 274],
                [113, 539, 747]
            ]
    category = request.GET.get('category', None)
    category = list(map(int, category.split(',')))
    notes = Note.objects.all()
    result = []
    for note in category:
        result += famous_notes[note]
    notes = notes.filter(id__in=result)

    serialize = NoteSerializers(notes, many=True)
    return Response(serialize.data)
    
# 서베이에 처음 들어왔을때 api요청
# 로그인 했을 때만..
# 이전에 서베이 기록 있으면 이전 서비스 정보 리턴 없으면 오류 메세지
@api_view(['GET'])
def nth_survey_or_not(request):
    user = is_logged_in(request)

    survey = Survey.objects.get(user=user)
    # 기존 서베이 정보 있을 때
    if survey is not None:
        serializer = SurveySerializers(survey, many=True)
        return Response(serializer.data)
    # 없을 때
    else:
        return Response(status=404)

@api_view(['GET'])
def perfume_detail(request, perfume_pk):
    perfume = Perfume.objects.get(pk=perfume_pk)
    serializer = PerfumeDetailSerializers(perfume)
    return Response(serializer.data)

# tf-idf_corr -> 비슷한 향수 추천

# knn -> 협업 필터링

class ListReviews(APIView):
    @swagger_auto_schema(
        operation_summary='특정 향수의 모든 리뷰 조회'
        )
    def get(self, request, perfume_pk):
        try:
            reviews = Perfume.objects.get(pk=perfume_pk).review_set.order_by('-created_at')
        except:
            return Response(status=404)
        serializers = ReviewSerializers(reviews, many=True)
        return Response(serializers.data or {'detail': 'Empty'}, status=200)

    @swagger_auto_schema(
        request_body=ReviewSerializers,
        operation_summary='특정 향수에 대한 리뷰 작성',
        manual_parameters=[
            openapi.Parameter(
                'Token',
                openapi.IN_HEADER,
                description='JWT',
                type=openapi.TYPE_STRING,
                required=True
                )
            ]
        )
    def post(self, request, perfume_pk):
        """
        이미지는 multipart/form-data로 보내주세요! Key 값은 "images" 입니다.
        """
        user = is_logged_in(request)
        try:
            perfume = Perfume.objects.get(pk=perfume_pk)
        except:
            return Response(status=404)
        serializers = ReviewSerializers(data=request.data)
        serializers.is_valid(raise_exception=True)
        review = serializers.save(
            user=user,
            perfume=perfume,
        )
        try:
            for img_file in dict((request.data).lists())['images']:
                with PILImage.open(img_file) as im:
                    im.save('tmp.webp', 'webp')
                image = Image.objects.create()
                image.original.save(f'{image.pk}.webp', File(open('tmp.webp', 'rb')))
                review.images.add(image)
        finally:
            return Response({'review_id': review.pk}, status=200)


class SingleReview(APIView):
    def get_object(self, review_pk):
        try:
            return Review.objects.get(pk=review_pk)
        except:
            raise Http404

    @swagger_auto_schema(
        operation_summary='특정 리뷰 조회',
        )
    def get(self, request, review_pk):
        review = self.get_object(review_pk)
        serializers = ReviewSerializers(review)
        return Response(serializers.data, status=200)

    @swagger_auto_schema(
        operation_summary='특정 리뷰 수정',
        request_body=ReviewSerializers,
        manual_parameters=[
            openapi.Parameter(
                'Token',
                openapi.IN_HEADER,
                description='JWT',
                type=openapi.TYPE_STRING,
                required=True
                )
            ]
        )
    def put(self, request, review_pk):
        """
        이미지는 multipart/form-data로 보내주세요! Key 값은 "images" 입니다.
        """
        user = is_logged_in(request)
        review = self.get_object(review_pk)
        if user != review.user:
            return Response(status=403)
        serializers = ReviewSerializers(instance=review, data=request.data)
        serializers.is_valid(raise_exception=True)
        review = serializers.save(
            user=user,
            perfume=review.perfume
        )
        for image in review.images.all():
            fp = os.path.join('media', 'review', 'original', f'{image.pk}.webp')
            os.remove(fp)
            image.delete()
        try:
            for img_file in dict((request.data).lists())['images']:
                with PILImage.open(img_file) as im:
                    im.save('tmp.webp', 'webp')
                image = Image.objects.create()
                image.original.save(f'{image.pk}.webp', File(open('tmp.webp', 'rb')))
                review.images.add(image)
        finally:
            return Response(status=200, headers={'Access-Control-Allow-Headers': 'token'})

    @swagger_auto_schema(
        operation_summary='특정 리뷰 삭제',
        manual_parameters=[
            openapi.Parameter(
                'Token',
                openapi.IN_HEADER,
                description='JWT',
                type=openapi.TYPE_STRING,
                required=True
                )
            ]
        )
    def delete(self, request, review_pk):
        user = is_logged_in(request)
        review = self.get_object(review_pk)
        if user != review.user:
            return Response(status=403)
        else:
            for image in review.images.all():
                fp = os.path.join('media', 'review', 'original', f'{image.pk}.webp')
                os.remove(fp)
                image.delete()
            review.delete()
            return Response(status=200, headers={'Access-Control-Allow-Headers': 'token'})

@swagger_auto_schema(
    operation_summary="특정 리뷰 '좋아요' / '좋아요 취소' 실행",
    manual_parameters=[
            openapi.Parameter(
                'Token',
                openapi.IN_HEADER,
                description='JWT',
                type=openapi.TYPE_STRING,
                required=True
                )
            ],
    method='get'
    )
@api_view(['GET'])
def like_review(request, review_pk):
    """
    Reponse는 좋아요 버튼을 누른 결과입니다.
    {"userLikesThisReview": Boolean}
    """
    user = is_logged_in(request)
    try:
        review = Review.objects.get(pk=review_pk)
    except:
        raise Http404
    if review in user.like_reviews.all():
        user.like_reviews.remove(review)
        return Response({'userLikesThisReview': False}, status=200)
    else:
        user.like_reviews.add(review)
        return Response({'userLikesThisReview': True}, status=200)