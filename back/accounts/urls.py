from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login),
    path('exists/email/<str:email>/', views.check_duplicate_email),
    path('signup/', views.signup),
]