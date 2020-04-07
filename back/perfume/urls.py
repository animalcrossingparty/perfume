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

schema_view = get_schema_view(
   openapi.Info(
      title="Accounts API",
      default_version='v1',
      description="User Info & Similarity Between Users"
   ),
)

def home(request):
    return redirect('swagger/')

urlpatterns = [
    path('', home),
    path('admin/', admin.site.urls),
    path('api/v1/accounts/', include('accounts.urls')),
    # path('redoc/', schema_view.with_ui('redoc'), name="api_docs"),
    path('swagger/', schema_view.with_ui('swagger'), name="api_swagger"),
]