import jwt, os, base64, json, random
from time import time

from PIL import Image as PILImage

from django.conf import settings
from django.core.files.images import File
from django.core.paginator import Paginator
from django.http import Http404, QueryDict
from django.shortcuts import render, get_object_or_404
from django.contrib.auth import get_user_model
from django.db.models import (
    Q, Count, Avg, F, IntegerField, Value, When, Case, ExpressionWrapper
)

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
    PerfumeDetailSerializers, NoteSerializers, SearchQuerySerializers, SurveyGETQuery,
    SurveyPOSTQuery
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
FAMOUS_FEMALE_PERFUMES = [
    26131711, 26124427, 26143979, 26123609, 26133691, 
    26125233, 26133238, 26152968, 26132748, 26150347, 
    26128643, 26128672, 26131830, 26125239, 26134042,
    26131741, 26131617, 26157585, 26134776, 26148349, 
    26143253, 26147317, 26125225, 26129045, 26142599,
    26142669
]
FAMOUS_MALE_PERFUMES = [
    26120368, 26136111, 26120217, 26125536, 26136111, 
    26120906, 26129285, 26130360, 26120617, 26143814,
    26131702, 26131542, 26146888, 26153980, 26150184, 
    26146434, 26124682, 26140186, 26147770
]
FAMOUS_UNISEX_PERFUMES = [
    26128238, 26150936, 26155264, 26132578, 26125725,
    26129074, 26144402, 26123480, 26130289, 26140273,
    26122099, 26142856, 26124417, 26129077, 26131303,
    26122076,26135917, 26125679, 26124217, 26131474,
    26147313, 26130500
]

SORT = {
    'alpha': lambda objects: objects.all().order_by('name'),
    'reviewcnt': lambda objects: objects.prefetch_related('review_set').annotate(reviewcnt=Count('review'))\
        .order_by('-reviewcnt'),
    'rate': lambda objects: objects.prefetch_related('review_set').annotate(reviewcnt=Count('review')).annotate(avgrate=Avg('review__rate')).filter(reviewcnt__gt=10)\
        .order_by('-avgrate'),
    'cheap': lambda objects: objects.order_by(F('price').asc(nulls_last=True)),
    'expensive': lambda objects: objects.order_by('-price'),
    'alpha': lambda objects: objects.order_by('name')
}
RESERVED_CAT = {
    '신선': {1, 2}, '새콤': {1, 2}, '상큼': {1, 2}, '상콤': {1, 2}, '과일': {2}, '꽃': {3, 4},
    '여성': {3, 4}, '여자': {3, 4}, '플로럴': {3, 4}, '아로마': {5, 9}, '허브': {5}, '향긋': {5},
    '톡쏘는': {6}, '강렬한': {6}, '달달': {7, 11}, '달다구리': {7, 11}, '남자다운': {8}, '나무': {8},
    '숲': {8}, '분내': {10}, '파우더리': {10}, '뽀송한': {10}, '시트러스': {1}, '풀': {5}, '스파이스': {6}
}
SEASONS_ID = {
    '봄': 1, 'spring': 1, '여름': 2, 'summer': 2, '가을': 3, 'autumn': 3, 'fall': 3, '겨울': 4, 'winter': 4
}

@api_view(['GET'])
def famous_perfumes(request):
    gender = request.GET.get('gender', 'all')
    sample = request.GET.get('sample', None)
    products = Perfume.objects.all().filter(availability=True)
    print(sample)
    if sample == '1':
        # 0: 남성, 1: 여성, 2: 공용
        if gender == '0':
            male = random.sample(FAMOUS_MALE_PERFUMES, 6)
            print(male)
            products = products.filter(id__in=male)
        elif gender == '1':
            female = random.sample(FAMOUS_FEMALE_PERFUMES, 6)
            print(len(female))
            products = products.filter(id__in=female)
        elif gender == '2':
            unisex = random.sample(FAMOUS_UNISEX_PERFUMES, 6)
            products = products.filter(id__in=unisex)
        else:
            all_perfumes = random.sample(FAMOUS_MALE_PERFUMES + FAMOUS_FEMALE_PERFUMES + FAMOUS_UNISEX_PERFUMES, 6)
            products = products.filter(id__in=all_perfumes)
    else:
        # 0: 남성, 1: 여성, 2: 공용
        if gender == '0':
            products = products.filter(id__in=FAMOUS_MALE_PERFUMES)
        elif gender == '1':
            products = products.filter(id__in=FAMOUS_FEMALE_PERFUMES)
        elif gender == '2':
            products = products.filter(id__in=FAMOUS_UNISEX_PERFUMES)
        else:
            all_perfumes = FAMOUS_MALE_PERFUMES + FAMOUS_FEMALE_PERFUMES + FAMOUS_UNISEX_PERFUMES
            products = products.filter(id__in=all_perfumes)

    serializer = PerfumeSerializers(products, many=True)
    return Response(serializer.data)


@swagger_auto_schema(
    operation_summary="향수 검색",
    method='get',
    query_serializer=SearchQuerySerializers
)
@api_view(['GET'])
def search(request):
    """
    검색어는 query param 'keywords'에 ','로 구분해서 주세요
    카테고리(영문), 노트(영문, 한글은 아직 불가능), 리뷰(영문), 계절(한글, 영문), 향수 이름(영문)으로 검색 후 10개의 향수를 list로 반환합니다.
    계절을 제외한 카테고리, 노트, 리뷰, 향수 이름은 contains로 필터링합니다.
    향수 이름이 비슷하면 3점, 브랜드명이 비슷하면 3점, 해당 계절의 향수이면 2점, 해당 노트가 포함되어 있으면 각각 1점, 
    리뷰 내용에 해당 단어가 포함되어 있으면 1점으로 계산합니다.
    점수가 높은 순으로 정렬하여 10개의 향수를 list로 리턴합니다.

    카테고리 예약어는 perfumes.views.py의 search 함수 docstring에 있습니다.
    citrus: ['시트러스', 신선', '새콤', '상큼', '상콤'],
    fruits: ['과일', '새콤', '상큼', '상콤', '신선'],
    flowers: ['꽃', '여성스러운', '여자여자한', '플로럴'],
    white_flowers: ['꽃', '여성스러운', '여자여자한', '플로럴'],
    greens: ['풀', '아로마', '허브', '향긋'],
    spices: ['스파이스', '톡쏘는', '강렬한'],
    sweets: ['달달한', '달다구리한'],
    woods: ['남자다운', '나무', '숲'],
    resins: ['아로마'],
    musk: ['분내', '파우더리', '뽀송'],
    beverages: ['달달한', '달다구리한']
    """
    st = time()
    keywords = request.GET.get('keywords')
    keywords = set(keywords.split(','))
    leng = len(keywords)
    kw_cat = keywords & set(RESERVED_CAT)
    keywords -= kw_cat
    id_kw_cat = set()
    for kw in kw_cat:
        id_kw_cat |= RESERVED_CAT[kw]

    perfumes = Perfume.objects.prefetch_related('brand').prefetch_related('categories')\
        .prefetch_related('top_notes').prefetch_related('heart_notes').prefetch_related('base_notes')\
        .prefetch_related('seasons')\
        .annotate(score=
            3 * Count('name', filter=Q(name__in=keywords))\
            + 3 * Count('brand', filter=Q(brand__name__in=keywords))\
            + Count('categories', filter=Q(categories__id__in=id_kw_cat))
            + Count('top_notes', filter=Q(top_notes__name__in=keywords))
            + Count('heart_notes', filter=Q(heart_notes__name__in=keywords))
            + Count('base_notes', filter=Q(base_notes__name__in=keywords))
            + 2 * Count('seasons', filter=Q(seasons__name__in=keywords))
            + 2 * Count('seasons', filter=Q(seasons__kor_name__in=keywords))
        )\
        .order_by('-score')[:10]
    serializers = PerfumeSerializers(perfumes, many=True)
    try:
        return Response(serializers.data, status=200)
    finally:
        print(f'{leng}개 단어 검색하는 데 걸린 시간: {time()-st}s')

class SurveyAPI(APIView):
    @swagger_auto_schema(
        query_serializer=SearchQuerySerializers,
        operation_summary='Survey 중 카테고리 선택 후 해당 노트 리스트 반환',
        )
    def get(self, request):
        """
        사용자가 좋아하는 카테고리를 누르면 그 카테고리에 해당하는 노트 리스트를 반환합니다.
        """
        categories = request.GET.get('category', None)
        categories = set(map(int, categories.split(',')))
        notes = Note.objects.all()
        result = []
        for i in categories:
            result += FAMOUS_NOTES[i]
        notes = notes.filter(id__in=result)
        serialize = NoteSerializers(notes, many=True)
        return Response(serialize.data)
    
    @swagger_auto_schema(
        operation_summary='Survey',
        request_body=SurveyPOSTQuery,
        manual_parameters=[
            openapi.Parameter(
                'Token',
                openapi.IN_HEADER,
                description='JWT',
                type=openapi.TYPE_STRING,
                )
            ]
        )
    def post(self, request):
        """
        서비스 
        """
        gender = request.POST.get('gender', None)
        gender = int(gender)
        age = str(request.POST.get('age', None))
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
            products = products.filter(seasons__id__in=season_list)
            print('season_filtered***********', products)
        
        products = products.filter(categories__id__in=categories)
        print('category_filtered***********', products)
        
        # 유명 노트 포함 향수 필터링
        products = products.filter(brand__id__in=FAMOUS_BRANDS)
        print('brand_filtered***********', products)

        # sort => include_note 많이 가지고 있는 애들부터 보여주기
        notes_list = []
        for num in categories:
            notes_list += FAMOUS_NOTES[num]
        products = products.annotate(all_notes=(F('top_notes') + F('heart_notes') + F('base_notes')))\
            .filter(all_notes__in=notes_list)
        products = products.annotate(all_notes=(F('top_notes') + F('heart_notes') + F('base_notes')))\
            .annotate(score=Count('all_notes', filter=Q(all_notes__in=notes_list))).filter(score__gt=0).order_by('-score')
        products = products[:15]
        print('final_filtered***********', products)

        try:
            user = is_logged_in(request)
        except:
            pass
        else:
            try:
                survey = Survey.objects.get(user=user)
            except:
                survey = Survey.objects.create(user=user)
            survey.season.set(seasons)
            survey.like_category.set(categories)
            survey.like_notes.set(notes)
            
        serializer = PerfumeSerializers(products, many=True)
        return Response(serializer.data, status=200)

@api_view(['GET'])
def perfumes_list(request):
    # QUERY STRINGS ----------------------------------------------
    # 필수값은 무엇인지, 기본값은 무엇인지
    sort = request.GET.get('sort', 'alpha') # 기본값 없음 무조건 줌
    categories = request.GET.get('category', None)
    page = int(request.GET.get('page', 1))
    brands = request.GET.get('brand', 'all')
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
        perfumes = perfumes.filter(brand__id__in=brands)

    try:
        categories = set(map(int, categories.split(',')))
    except:
        pass
    else:
        perfumes = perfumes.filter(categories__id__in=categories)

    try:
        notes = set(map(int, notes.split(',')))
    except:
        pass
    else:
        perfumes = perfumes.filter(Q(top_notes__id__in=notes) | Q(heart_notes__id__in=notes) | Q(base_notes__id__in=notes))

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
        serializer = PerfumeSerializers(paged_perfumes, many=True)
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