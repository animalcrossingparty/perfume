from django.urls import path
from . import views

urlpatterns = [
    path('', views.perfumes_list),
    path('<int:perfume_pk>', views.perfume_detail),
    path('survey/', views.perfume_survey),
    path('<int:perfume_pk>/reviews/', views.review_create),
    path('<int:perfume_pk>/reviews/<int:review_pk>/', views.review_detail),
]
