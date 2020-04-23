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

CORS_ORIGIN_WHITELIST = [
    # 배포 주소 추가 예정
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://127.0.0.2:3000",
    "http://i02b208.p.ssafy.io:3000"
]

CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
    'token'
]