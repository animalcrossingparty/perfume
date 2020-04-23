from .models import Perfume, Review, Brand, Note
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
from perfumes.utils import survey
from django.db.models import Q, Count, Avg
import json
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from time import time
from django.http import Http404
# from perfumes.utils import wordcloud

PAGE_SIZE = 12

def is_logged_in(request):
    encoded_jwt = request.headers['Token']
    decoded = jwt.decode(encoded_jwt, settings.SECRET_KEY, algorithms=['HS256'])
    user = get_user_model().objects.get(pk=decoded['userId'])
    return user

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

    products = Perfume.objects.filter(availibility=True).prefetch_related('review_set').annotate(review__count=Count('review')).annotate(avg_rate=Avg('review__rate')).all()

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
        num_pages = Paginator(products, PAGE_SIZE).num_pages
        print('페이지 수',num_pages)
        serializer = PerfumeSerializers(paged_products, many=True).data
    except: 
        invalid_page_message = f'{page} 페이지에는 결과가 없습니다. 해당 요청의 최대 페이지 수: < {Paginator(products, PAGE_SIZE).num_pages} >'
        return Response(invalid_page_message, status=404)

    return Response(serializer, headers={'num_pages': num_pages, 'Access-Control-Expose-Headers': 'num_pages'})


@api_view(['GET'])
def perfume_detail(request, perfume_pk):
    perfume = Perfume.objects.get(pk=perfume_pk)
    serializer = PerfumeDetailSerializers(perfume)
    return Response(serializer.data)

# 성별, 나이, 계절을 받았을 때 남아있는 향수들의 노트를 알려준다 -> include, exclude 카테고리를 받는다. -> note를 리턴
@api_view(['GET'])
def left_notes(request):
    # 로그인 유무
    # try:
    #     encoded_jwt = request.headers['Token']
    #     decoded = jwt.decode(encoded_jwt, settings.SECRET_KEY, algorithms=['HS256'])
    #     user = get_user_model().objects.get(pk=decoded['userID'])
    # except:  # 회원 아니면
    #     return Response(status=401)

    gender = request.GET.get('gender', None)
    age = request.GET.get('age', None)
    age = str(age)
    season = request.GET.get('season', None)
    include = request.GET.get('include', None)
    exclude = request.GET.get('exclude', None)

    products = Perfume.objects.all().prefetch_related('brand').prefetch_related('top_notes').prefetch_related('heart_notes').prefetch_related('base_notes').prefetch_related('categories').filter(availibility=True)
    products = products.filter(gender=gender)

    if include is not None:
        include_list = include.split(',')
        for category in include_list:
            products = products.filter(categories__name=category)
    
    if exclude is not None:
        exclude_list = exclude.split(',')
        for category in exclude_list:
            products = products.exclude(categories__name=category)
    
    products = products[:10]
    notes = Note.objects.all()
    for product in products:
        top = product.top_notes.values()
        heart = product.heart_notes.values()
        base = product.base_notes.values()
        notes = notes.filter(Q(pk__in=top) | Q(pk__in=heart) | Q(pk__in=base))

    print(total_notes)
    # print(left_notes)
    serialize = LeftNoteSerializers(total_notes, many=True)
    return Response(serialize.data)
    
# 서베이에 처음 들어왔을때 api요청
# 로그인 했을 때만..
# 이전에 서베이 기록 있으면 이전 서비스 정보 리턴 없으면 오류 메세지
@api_view(['GET'])
def nth_survey_or_not(request):
    try:
        encoded_jwt = request.headers['Token']
        decoded = jwt.decode(encoded_jwt, settings.SECRET_KEY, algorithms=['HS256'])
        user = get_user_model().objects.get(pk=decoded['userID'])
    except:  # 회원 아니면
        return Response(status=401)

    survey = Survey.objects.get(user=user)
    # 기존 서베이 정보 있을 때
    if survey is not None:
        serializer = SurveySerializers(survey, many=True)
        return Response(serializer.data)
    # 없을 때
    else:
        return Response(status=404)

@api_view(['GET', 'POST'])
def perfume_survey(request):
    try:
        encoded_jwt = request.headers['Token']
        decoded = jwt.decode(encoded_jwt, settings.SECRET_KEY, algorithms=['HS256'])
        user = get_user_model().objects.get(pk=decoded['userID'])
    except:  # 회원 아니면
        return Response(status=401)
    # surveyresult -> user_id key로 묶인다

    if request.method == 'POST':
        gender = request.POST.get('gender', None)
        age = request.POST.get('age', None)
        # age = str(age)
        seasons = request.POST.get('seasons', None)
        like_category = request.POST.get('like_category', None)
        hate_category = request.POST.get('hate_category', None)
        include_notes = request.POST.get('include_notes', 'all')

        # users = get_user_model().objects.all()
        products = Perfume.objects.all().prefetch_related('brand').filter(availibility=True)

        # 성별
        if gender is not None:
            products = products.filter(gender=gender)

        # 나이
        # products = products.filter(age__startswith=age[0])

        # 계절
        # seasons_list = seasons.split(',')
        # for season in seasons_list:
        #     products = products.filter(season__in=season)

        # 좋아하는 카테고리
        # like_categories = like_category.split(',')
        # for like in like_categories:
        #     products = products.filter(category__name=like)

        # 싫어하는 카테고리
        # hate_categories = hate_category.split(',')
        # for hate in hate_categories:
        #     products = products.exclude(category__name=hate)

        # 좋아하는 향료
        if include_notes != 'all':
            try:
                note_list = include_notes.split(',')
                for i, note in enumerate(note_list):
                    products = products.filter(Q(top_notes__name=note) | Q(heart_notes__name=note) | Q(base_notes__name=note))
                # products = products.distinct()
                # products = products[:10]
            except:
                print(products)
                return 0

        serializer = PerfumeSurveySerializers(products, many=True)
        return Response(serializer.data)
    else:
        gender = request.POST.get('gender', None)
        age = request.POST.get('age', None)
        seasons = request.POST.get('seasons', None)
        like_category = request.POST.get('like_category', None)
        hate_category = request.POST.get('hate_category', None)
        include_notes = request.POST.get('include_notes', None)

        # 조사 결과 db에 저장
        survey = Survey.objects.create(
            user=user.id,
            seasons=seasons,
            like_category=like_category,
            hate_category=hate_category,
            like_notes=include_notes,
        )
        survey.save()

        return Response(survey, status=200)

# 설문조사 결과를 db에 저장
# @api_view(['POST'])
# def survey_db_create(request):
#     try:
#         encoded_jwt = request.headers['Token']
#         decoded = jwt.decode(encoded_jwt, settings.SECRET_KEY, algorithms=['HS256'])
#         user = get_user_model().objects.get(pk=decoded['userID'])
#     except:  # 회원 아니면
#         return Response(status=401)

#     gender = request.POST.get('gender', None)
#     age = request.POST.get('age', None)
#     seasons = request.POST.get('seasons', None)
#     like_category = request.POST.get('like_category', None)
#     hate_category = request.POST.get('hate_category', None)
#     include_notes = request.POST.get('include_notes', None)

#     # 조사 결과 db에 저장
#     survey = Survey.objects.create(
#         user=user.id,
#         seasons=seasons,
#         like_category=like_category,
#         hate_category=hate_category,
#         like_notes=include_notes,
#     )
#     survey.save()

#     return Response(survey, status=200)




def make_wordcloud(request, perfume_pk):
    reviews = Review.objects.filter(perfume=perfume_pk)
    wordcloud.tokenizing(reviews)

    serializer = PerfumeSerializers()


class ListReviews(APIView):
    @swagger_auto_schema(
        operation_summary='특정 향수의 모든 리뷰 조회'
        )
    def get(self, request, perfume_pk):
        try:
            reviews = Perfume.objects.get(pk=perfume_pk).review_set
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
        try:
            user = is_logged_in(request)
        except:
            return Response(status=401)
        try:
            perfume = Perfume.objects.get(pk=perfume_pk)
        except:
            return Response(status=404)
        serializers = ReviewSerializers(data=request.data)
        serializers.is_valid(raise_exception=True)
        review = serializers.save(
            user_id=user.pk,
            perfume_id=perfume.pk
        )
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
        try:
            user = is_logged_in(request)
        except:
            return Response(status=401)
        review = self.get_object(review_pk)
        if user != review.user:
            return Response(status=403)
        serializers = ReviewSerializers(instance=review, data=request.data)
        serializers.is_valid(raise_exception=True)
        serializers.save()
        return Response(status=200)

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
        try:
            user = is_logged_in(request)
        except:
            return Response(status=401)
        review = self.get_object(review_pk)
        if user != review.user:
            return Response(status=403)
        else:
            review.delete()
            return Response(status=200)