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