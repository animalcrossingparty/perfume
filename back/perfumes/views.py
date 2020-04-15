from django.shortcuts import render
from .models import Perfume, Review
from .serializers import PerfumeSerializers, PerfumeDetailSerializers
from rest_framework.decorators import api_view
from rest_framework.response import Response

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

def reviews_list(request, perfume_pk):
    pass

def review_detail(request, perfume_pk, review_pk):
    pass