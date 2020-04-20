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

DEBUG = False

CORS_ORIGIN_WHITELIST = (
    'localhost:3000/'
)