from .base import *

# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases

DATABASES = {
    'default' : {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'laure_richis',
        'USER': 'root',
        'PASSWORD': 'password',
        'HOST': 'localhost',
        'PORT': '3307',
        'OPTIONS': {
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
            'charset': 'utf8mb4',  # perfume name 중 emoji가 섞여 있는 향수가 있어서 인코딩 바꿨어요 
            'use_unicode': True,
        },
    },
}

INSTALLED_APPS += [
    'django_extensions'
]

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True