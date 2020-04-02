from django.shortcuts import render, get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view
from .serializers import UserSerializers
from rest_framework.response import Response


@api_view(['GET'])  # http method의 GET요청을 의미
def index(request):
    """
    유저 목록 정보
    """
    users = get_user_model().objects.all()
    serializer = UserSerializers(users, many=True)
    # 쿼리 셋이라 many=True 안 하면 어트리뷰트가 없다고 에러남 그래서 많이 가지고 있다고 붙여주는 거임(?)
    return Response(serializer.data)

# @api_view(['GET'])
# def detail(request, music_pk):
#     """
#     음악 상세 정보
#     """
#     music = get_object_or_404(Music, pk=music_pk)
#     serializer = MusicSerializers(music)
#     # 쿼리셋이 아니라 단일 오브젝트라 매니는트류 필요없ㅇ므
#     return Response(serializer.data)

# # 아티스트 목록
# @api_view(['GET'])
# def artists_index(request):
#     """
#     가수 목록 정보
#     """
#     artists = Artist.objects.all()
#     serializer = ArtistSerializers(artists, many=True)
#     return Response(serializer.data)

# @api_view(['GET'])
# def artists_detail(request, artist_pk):
#     """
#     가수 상세 정보
#     """
#     artist = get_object_or_404(Artist, pk=artist_pk)
#     serializer = ArtistDetailSerializers(artist)
#     return Response(serializer.data)

# # 리뷰 작성
# @api_view(['POST'])
# def review_create(request, music_pk):
#     serializer = ReviewSerializers(data=request.data)
#     if serializer.is_valid(raise_exception=True):
#         serializer.save(music_id=music_pk)
#     return Response({'message': 'review가 등록되었습니다.'})

# @api_view(['PUT', 'DELETE'])
# def review_update_delete(request, review_pk):
#     review = get_object_or_404(Review, pk=review_pk)
#     if request.method == 'PUT':
#         serializer = ReviewSerializers(data=request.data, instance=review)
#         if serializer.is_valid(raise_exception=True):
#             serializer.save()
#             return Response(serializer.data)
#     else:
#         review.delete()
#         return Response({'message': '성공적으로 삭제되었습니다.'})