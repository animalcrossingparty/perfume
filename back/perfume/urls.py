"""perfume URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token


schema_view = get_schema_view(
   openapi.Info(
      title="Accounts API",
      default_version='v1',
      description="User Info & Similarity Between Users"
   ),
)

BASE_PATH = 'api/v1/'

def home(request):
    return redirect(f'{BASE_PATH}swagger/')

urlpatterns = [
    path('', home),
    path('admin/', admin.site.urls),
    path(f'{BASE_PATH}accounts/', include('accounts.urls')),
    # jwt-token
    path(f'{BASE_PATH}token/', obtain_jwt_token),
    path(f'{BASE_PATH}token/verify/', verify_jwt_token),
    path(f'{BASE_PATH}token/refresh/', refresh_jwt_token),
    # path('redoc/', schema_view.with_ui('redoc'), name="api_docs"),
    path(f'{BASE_PATH}swagger/', schema_view.with_ui('swagger'), name="api_swagger"),
]