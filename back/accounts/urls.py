from django.urls import path, include
from . import views
from django.contrib import admin
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token

urlpatterns = [
    # path('musics/', views.index, name="music"),
    # path('musics/<int:music_pk>/', views.detail, name="detail"),
    # path('musics/<int:music_pk>/reviews/', views.review_create, name="review_create"),
    # path('artists/', views.artists_index, name="artists_index"),
    # path('reviews/<int:review_pk>/', views.review_update_delete, name="review_update_delete"),
    # path('artists/<int:artist_pk>/', views.artists_detail, name="artists_detail"),
    # path('redoc/', schema_view.with_ui('redoc'), name="api_docs"),
    # path('swagger/', schema_view.with_ui('swagger'), name="api_swagger"),
    path('users/', views.index),
    # jwt-token
    path('admin/', admin.site.urls),
    path('login/', obtain_jwt_token),
    path('token/verify/', verify_jwt_token),
    path('token/refresh/', refresh_jwt_token),
]