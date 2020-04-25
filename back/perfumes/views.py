from .models import Perfume, Review, Brand, Note, Base64Image
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
from django.db.models import Q, Count, Avg
import json
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from time import time
from django.http import Http404, QueryDict
from rest_framework.exceptions import AuthenticationFailed
from accounts.views import is_logged_in
import base64
# from perfumes.utils import wordcloud

PAGE_SIZE = 12

famous_notes = [   
                96, 155, 227, 388, 515, 522, 530, 562, 660, 
                16, 45, 51, 75, 118, 207, 245, 272, 281, 390, 416, 491, 541, 565, 593, 694, 765, 858, 911,
                2, 161, 201, 208, 353, 358, 426, 444, 461, 512, 785, 
                472, 527, 
                19, 48, 82, 194, 197, 323, 379, 392, 395, 604, 688, 692, 793, 
                224, 247, 376, 668, 708, 846, 908, 920, 
                100, 129, 137, 146, 168, 176, 268, 283, 289, 300, 433, 571, 
                74, 270, 336, 428, 647, 808, 
                73,778, 889, 
                26, 71, 205, 599, 624, 
                88, 124, 173, 203, 274, 
                113, 539, 747
            ]

@api_view(['GET'])
def filtering(request):
    gender = request.GET.get('gender', None)
    age = request.GET.get('age', None)
    age = str(age)
    seasons = request.GET.get('season', None)
    include = request.GET.get('include', None)

    famous_brands =[
                    1241, 1238, 1624, 2153, 864, 1708, 1713, 1724, 1816, 2023, 1934, 
                    2097, 2626, 528, 527, 390, 391, 647, 648, 260, 40, 215, 936, 1504, 
                    1543, 1517, 555, 687, 678, 1418, 1525, 2706, 2446, 16, 2326, 3046, 
                    614, 653, 1122, 293, 749, 532, 855, 1733, 3130, 2495, 3227, 3032, 
                    1315, 1191, 2326, 1240, 1200, 2036, 3140, 2104
                    ]

    products = Perfume.objects.all().prefetch_related('seasons').prefetch_related('brand').prefetch_related('top_notes').prefetch_related('heart_notes').prefetch_related('base_notes').prefetch_related('categories').filter(availability=True)
    
    products = products.filter(gender=gender)
  
    if seasons is not None:
        season_list = seasons.split(',')
        products = products.filter(seasons__in=season_list)

    if include is not None:
        include_list = include.split(',')
        for category in include_list:
            products = products.filter(categories__in=category)

    # 유명 노트 포함 향수 필터링
    tops = products.values_list('top_notes',flat=True)
    hearts = products.values_list('heart_notes',flat=True)
    base = products.values_list('base_notes',flat=True)
    products = products.filter(Q(top_notes__in=famous_notes) | Q(heart_notes__in=famous_notes) | Q(base_notes__in=famous_notes))
    products = products.filter(brand__in=famous_brands)

    return products


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
    user = is_logged_in(request)

    products = filtering(request)

    notes = Note.objects.all()
    tops = products.values_list('top_notes',flat=True)
    hearts = products.values_list('heart_notes',flat=True)
    base = products.values_list('base_notes',flat=True)
    total_list = tops.union(hearts, base)
    # total_list = total_list.filter(id__in=famous_notes)
    notes = notes.filter(id__in=list(total_list & famous_notes))

    if len(notes) > 8:
        notes = notes[:8]

    print(notes)
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

@api_view(['GET', 'POST'])
def perfume_survey(request):
    user = is_logged_in(request)
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
        products = Perfume.objects.all().prefetch_related('brand').filter(availability=True)

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
        gender = request.GET.get('gender', None)
        age = request.GET.get('age', None)
        seasons = request.GET.get('seasons', None)
        like_category = request.GET.get('like_category', None)
        hate_category = request.GET.get('hate_category', None)
        include_notes = request.GET.get('include_notes', None)

        # 조사 결과 db에 저장
        survey = Survey.objects.create(
            user=user,
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

def call_tf_idf(request, perfume_pk):
    reviews = Review.get(perfume=perfume_pk)

    return 1

@api_view(['GET'])
def perfume_detail(request, perfume_pk):
    perfume = Perfume.objects.get(pk=perfume_pk)
    serializer = PerfumeSerializers(perfume)
    return Response(serializer.data)

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
                base64img = base64.b64encode(img_file.read())
                img = Base64Image.objects.create(data=base64img)
                review.images.add(img)
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
        for image in review.images.all():  # 원래 리뷰의 이미지 삭제
            image.delete()
        try:  # 업로드 이미지가 있다면 추가
            for img_file in dict((request.data).lists())['images']:
                base64img = base64.b64encode(img_file.read())
                img = Base64Image.objects.create(data=base64img)
                review.images.add(img)
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