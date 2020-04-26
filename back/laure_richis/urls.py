from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
from accounts.utils.EmailAuthBackend import EmailAuthBackend
from django.conf import settings


def home(requests):
    return redirect('/swagger')


schema_view = get_schema_view(
    openapi.Info(
        title="Laure Richis API Server",
        default_version='v1',
        description="로르리시 백엔드",
        contact=openapi.Contact(
            name="Hyejin Yang", email="yang94lol@naver.com", url="https://github.com/HyejinYang"),
        ),
    # authentication_classes=(EmailAuthBackend,),
    # validators=['ssv'],
    public=True,
    permission_classes=(permissions.AllowAny,),
    url=settings.SWAGGER_BASE_URL,
)

urlpatterns = [
    path('', home),
    path('admin/', admin.site.urls),
    path('swagger/', schema_view.with_ui('swagger')),
    path('accounts/', include('accounts.urls')),
    path('perfumes/', include('perfumes.urls')),
]
