from django.shortcuts import render, get_object_or_404
from .models import Perfume, Review
from .serializers import PerfumeSerializers, PerfumeDetailSerializers, ReviewDetailSerializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
import jwt
from time import time
from django.contrib.auth import get_user_model

@api_view(['GET'])
def perfumes_list(request):
    perfumes = Perfume.objects.get(pk=1)
    print(perfumes.name)
    # for perfume in perfumes:
    #     print(perfume.name)
    serializer = PerfumeSerializers(perfumes)
    print(serializer)
    return Response(serializer.data)

@api_view(['GET'])
def perfume_detail(request, perfume_pk):
    perfume = Perfume.objects.get(pk=perfume_pk)
    serializer = PerfumeDetailSerializers(perfume)
    return Response(serializer.data)

def perfume_survey(request):
    pass


@api_view(['POST'])
def review_create(request, perfume_pk):
    encoded_jwt = request.headers['Token']
    try:
        decoded = jwt.decode(encoded_jwt, settings.SECRET_KEY, algorithms=['HS256'])
        user = get_user_model().objects.get(pk=decoded['userID'])
    except:
        return Response(status=401)
    else:
        data = request.body
        print(data)
        # Review.objects.create(
        #     user=user,
        #     perfume=perfume_pk,
        #     content=
        # )
        return Response(status=200)

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def review_detail(request, perfume_pk, review_pk):
    if request.method == 'GET':
        try:
            review = Review.objects.get(pk=review_pk)
            serializer = ReviewDetailSerializers(review)
            return Response(serializer.data)
        except:
            return Response(status=404)









# {'token': b'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySUQiOjEsInVzZXJuYW1lIjoiYW5vbnltb3VzMUB0ZXN0LmNvbSIsImlhdCI6MTU4NzM1NjI0MSwiZXhwIjoxNTk0NTU2MjQxfQ.NLFscFfepnNGJaPcSfpYBMuj0Ciyt3j89RDOf6J96Xg'}