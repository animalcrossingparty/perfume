import os
from .base import *

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'HOST': 'db',
        'NAME': 'laure_richis',
        'USER': 'user',
        'PASSWORD': '1',
    }
}
STATIC_DIR = os.path.join(BASE_DIR, 'code', 'static')
DEBUG = True

CORS_ORIGIN_WHITELIST = (
    'localhost:3000/'
)