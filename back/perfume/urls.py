from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

def home(requests):
    return redirect('/swagger')


schema_view = get_schema_view(
    openapi.Info(
        title="Music API",
        default_version='v1',
        description="Music, Artist Info"
    ),
)

urlpatterns = [
	path('', home),
    path('admin/', admin.site.urls),
    path('swagger/', schema_view.with_ui('swagger')),
	path('accounts/', include('accounts.urls'))
]
