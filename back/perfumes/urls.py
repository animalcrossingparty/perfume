from django.urls import path
from . import views

urlpatterns = [
    path('', views.perfumes_list),
    path('<int:perfume_pk>/', views.perfume_detail),
    path('survey/', views.SurveyAPI.as_view()),
    path('famous/', views.famous_perfumes),
    path('<int:perfume_pk>/reviews/', views.ListReviews.as_view()),
    path('reviews/<int:review_pk>/', views.SingleReview.as_view()),
    path('reviews/<int:review_pk>/like/', views.like_review),
]