from django.shortcuts import render
from .models import Perfume, Review
from .serializers import PerfumeSerializers, PerfumeDetailSerializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from perfumes.utils import survey

@api_view(['GET'])
def perfumes_list(request):
    perfumes = Perfume.objects.get(pk=1)
    print(perfumes.name)
    # for perfume in perfumes:
    #     print(perfume.name)
    serializer = PerfumeSerializers(perfumes)
    print(serializer)
    return Response(serializer.data)

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
