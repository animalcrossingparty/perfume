from django.shortcuts import render
from .models import Perfume, Review, Brand
from .serializers import PerfumeSerializers, PerfumeDetailSerializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.paginator import Paginator
from perfumes.utils import survey
from django.db.models import Q, Count, Avg

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

def perfume_detail(request, perfume_pk):
    pass

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

def reviews_list(request, perfume_pk):
    pass

def review_detail(request, perfume_pk, review_pk):
    pass