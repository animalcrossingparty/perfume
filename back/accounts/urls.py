from django.urls import path
from . import views

urlpatterns = [
    path('musics/', views.index, name="music"),
    path('musics/<int:music_pk>/', views.detail, name="detail"),
    path('musics/<int:music_pk>/reviews/', views.review_create, name="review_create"),
    path('artists/', views.artists_index, name="artists_index"),
    path('reviews/<int:review_pk>/', views.review_update_delete, name="review_update_delete"),
    path('artists/<int:artist_pk>/', views.artists_detail, name="artists_detail"),

]