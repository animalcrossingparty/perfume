from django.urls import path
from . import views

urlpatterns = [
    path('', views.perfumes),
    path('<int:perfume_pk>', views.perfume_detail),
    path('<int:perfume_pk>/reviews/', views.reviews),
    path('<int:perfume_pk>/reviews/<int:review_pk>/', views.review_detail),
]
