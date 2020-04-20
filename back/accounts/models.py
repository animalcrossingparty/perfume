from django.db import models
from django.contrib.auth.models import AbstractUser
from randstr import randstr
from perfumes.models import Perfume, Note, Season, Category

class User(AbstractUser):
    def profile_image_path(self, instance, filename):
        return 'pimage' + instance.user.username + '/' + randstr(5) + '.' + filename.split('.')[-1]

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    profile_image = models.ImageField(blank=True, upload_to=profile_image_path)
    country = models.CharField(default='Republic of Korea' , max_length=100)
    gender = models.CharField(default="shared/unisex", max_length=30)
    role = models.IntegerField(default=0)
    age = models.IntegerField(default=0)
    like_perfumes = models.ManyToManyField(to=Perfume, related_name='like_users')
    points = models.IntegerField(default=0)

class Survey(models.Model):
    user = models.ForeignKey(to=User, on_delete=models.PROTECT)
    rnd = models.IntegerField(default=0)
    season = models.ManyToManyField(to=Season)
    hate_notes = models.ManyToManyField(to=Note, related_name='hate_users')
    like_notes = models.ManyToManyField(to=Note, related_name='like_users')
    like_category = models.ManyToManyField(to=Category)