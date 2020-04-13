from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from accounts.utils.EmailAuthBackend import EmailAuthBackend


def home(requests):
    return redirect('/swagger')


schema_view = get_schema_view(
    openapi.Info(
        title="Laure Richis API Server",
        default_version='v1',
        description="로르리시 백엔드",
        contact=openapi.Contact(
            name="Linus Lee", email="lkh151515@gmail.com", url="https://"),
    ),
    authentication_classes=(EmailAuthBackend,),
)

urlpatterns = [
    path('', home),
    path('admin/', admin.site.urls),
    path('swagger/', schema_view.with_ui('swagger')),
    path('accounts/', include('accounts.urls')),
    path('perfumes/', include('perfumes.urls')),
]
