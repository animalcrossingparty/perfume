import jwt, os, base64, json, random
from time import time

from PIL import Image as PILImage

from django.conf import settings
from django.core.files.images import File
from django.core.paginator import Paginator
from django.http import Http404, QueryDict
from django.shortcuts import render, get_object_or_404
from django.contrib.auth import get_user_model
from django.db.models import Q, Count, Avg, F

from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed, ValidationError

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from accounts.views import is_logged_in
from accounts.models import Survey
from .models import Perfume, Review, Brand, Note, Image
from .serializers import (
    PerfumeSerializers, PerfumeSurveySerializers, SurveySerializers, ReviewSerializers,
    PerfumeDetailSerializers, NoteSerializers
)
from .utils import knn, tf_idf, exchange_rate

PAGE_SIZE = 12
FAMOUS_NOTES = [
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
FAMOUS_BRANDS = [
    1241, 1238, 1624, 2153, 864, 1708, 1713, 1724, 1816, 2023, 1934, 
    2097, 2626, 528, 527, 390, 391, 647, 648, 260, 40, 215, 936, 1504, 
    1543, 1517, 555, 687, 678, 1418, 1525, 2706, 2446, 16, 2326, 3046, 
    614, 653, 1122, 293, 749, 532, 855, 1733, 3130, 2495, 3227, 3032, 
    1315, 1191, 2326, 1240, 1200, 2036, 3140, 2104
]
SORT = {
    'alpha': lambda objects: objects.all().order_by('name'),
    'reviewcnt': lambda objects: objects.prefetch_related('review_set').annotate(reviewcnt=Count('review'))\
        .filter(reviewcnt__gt=10).order_by('-reviewcnt'),
    'rate': lambda objects: objects.prefetch_related('review_set').annotate(avgrate=Avg('review__rate'))\
        .order_by('-avgrate'),
    'cheap': lambda objects: objects.order_by('price'),
    'expensive': lambda objects: objects.order_by('-price'),
    'alpha': lambda objects: objects.order_by('name')
}

def search(request, keywords):
    # keywords = keywords.split()
    # q = Q()
    # for kw in keywords:
    #     q |= Q(name_icontains=kw)
    # Perfume.objects.filter(q)
    # 봄 여름 가을 겨울 브랜드, 카테고리

    # perfume
    return 


class SurveyAPI(APIView):
    # @swagger_auto_schema(
    # operation_summary="특정 리뷰 '좋아요' / '좋아요 취소' 실행",
    # query_serializer=SurveyQueryParamsSerializers,
    # )
    def get(self, request):
        """
        사용자가 좋아하는 카테고리를 누르면 그 카테고리에 해당하는 노트 리스트를 반환합니다.
        """
        categories = request.GET.get('category', None)
        categories = map(int, categories.split(','))
        notes = Note.objects.all()
        result = []
        for i in categories:
            result += FAMOUS_NOTES[i]
        notes = notes.filter(id__in=result)
        serialize = NoteSerializers(notes, many=True)
        return Response(serialize.data)
    
    def post(self, request):
        gender = request.POST.get('gender', 'all')
        # age = str(request.POST.get('age', None))
        seasons = request.POST.get('season', None)
        categories = request.POST.get('category', None)
        categories = set(map(int, categories.split(',')))
        notes = request.POST.get('notes', None)
        notes = set(map(int, notes.split(',')))

        products = Perfume.objects.all().prefetch_related('seasons').prefetch_related('brand')\
            .prefetch_related('top_notes').prefetch_related('heart_notes').prefetch_related('base_notes')\
            .prefetch_related('categories').filter(availability=True)
        print(products)

        products = products.filter(gender=gender)
        print('gender_filtered', products)

        if seasons is not None:
            season_list = seasons.split(',')
            products = products.filter(seasons__in=season_list)
            print('season_filtered***********', products)
        
        products = products.filter(categories__in=categories)
        print('category_filtered***********', products)
        
        # 유명 노트 포함 향수 필터링
        products = products.filter(brand__in=FAMOUS_BRANDS)
        print('brand_filtered***********', products)

        # sort => include_note 많이 가지고 있는 애들부터 보여주기
        notes_list = []
        for num in categories:
            notes_list += FAMOUS_NOTES[num]
        products = products.annotate(all_notes=(F('top_notes') + F('heart_notes') + F('base_notes')))\
            .filter(all_notes__in=notes)
        products = products.annotate(all_notes=(F('top_notes') + F('heart_notes') + F('base_notes')))\
            .annotate(score=Count('all_notes', filter=Q(all_notes__in=notes_list))).filter(score__gt=0).order_by('-score')
        products = products[:15]
        print('final_filtered***********', products)

        try:
            user = is_logged_in(request)
        except:
            pass
        else:
            survey = Survey.objects.create(
                user=user,
                seasons=seasons,
                like_category=like_category,
                like_notes=include_notes,
            )
            survey.save()

        serializer = PerfumeSerializers(products, many=True)
        return Response(serializer.data, status=200)

@api_view(['GET'])
def perfumes_list(request):
    # QUERY STRINGS ----------------------------------------------
    # 필수값은 무엇인지, 기본값은 무엇인지
    sort = request.GET.get('sort', 'alpha') # 기본값 없음 무조건 줌
    category = request.GET.get('category', 'all')  # 카테고리는 하나만 옴 사용자의 혼란을 줄이기 위해
    page = int(request.GET.get('page', 1))
    brands = request.GET.get('brand_name', 'all')
    notes = request.GET.get('include', 'all')
    gender = request.GET.get('gender', 'all')  # 0: 남자, 1: 여자, 2: 공용 , all 중 무조건 하나만 줌
    # ------------------------------------------------------------

    perfumes = Perfume.objects.filter(availability=True)

    try:  # 'all'인지 아닌지 확인
        gender = int(gender)
    except:
        pass
    else:
        perfumes = perfumes.filter(gender=gender)

    try:  # 'all'인지 아닌지 확인
        brands = set(map(int, brands.split(',')))
    except:
        pass
    else:
        if len(brands) == 1:
            perfumes = perfumes.filter(brand=int(brands))
        else:
            perfumes = perfumes.filter(brand__in=brands)

    try:
        category = int(category)
    except:
        pass
    else:
        perfumes = perfumes.filter(categories=category)

    try:
        notes = set(map(int, notes.split(',')))
    except:
        pass
    else:
        perfumes = perfumes.filter(Q(top_notes__in=notes) | Q(heart_notes__in=notes) | Q(base_notes__in=notes))

    # 정렬
    perfumes = SORT[sort](perfumes)

    # 페이지네이션
    print(perfumes)
    try:
        paginated = Paginator(perfumes, PAGE_SIZE)
        paged_perfumes = paginated.page(page)
        print(paged_perfumes)
        num_pages = paginated.num_pages
        print('페이지 수',num_pages)
        serializer = PerfumeSerializers(paged_products, many=True)
    except: 
        invalid_page_message = f'{page} 페이지에는 결과가 없습니다. 해당 요청의 최대 페이지 수: < {paginated.num_pages} >'
        return Response(invalid_page_message, status=404)

    return Response(serializer.data, headers={'num_pages': num_pages, 'Access-Control-Expose-Headers': 'num_pages'})


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
    user.like_reviews.add(review)
    return Response({'userLikesThisReview': True}, status=200)