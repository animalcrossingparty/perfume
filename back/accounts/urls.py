from django.urls import path
from . import views
from .views import ListUsers, SingleUser

urlpatterns = [
    path('login/', views.login),
    path('exists/email/<str:email>/', views.check_duplicate_email),
    path('ranking/', ListUsers.as_view()),
    path('user/', SingleUser.as_view()),
]