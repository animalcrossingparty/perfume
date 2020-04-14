from django.db import models
from django.conf import settings

class Brand(models.Model):
    name = models.CharField(max_length=100)
    logo_image = models.ImageField()

class Category(models.Model):
    name = models.CharField(max_length=50)

class Note(models.Model):
    name = models.CharField(max_length=100)

class Perfume(models.Model):
    name = models.CharField(max_length=100)
    launch_date = models.DateField()
    thumbnail = models.CharField(max_length=200)
    gender = models.CharField(max_length=20)
    brand = models.ForeignKey(to=Brand, on_delete=models.PROTECT)
    top_notes = models.ManyToManyField(to=Note, related_name="perfumes_top")
    heart_notes = models.ManyToManyField(to=Note, related_name="perfumes_heart")
    base_notes = models.ManyToManyField(to=Note, related_name="perfumes_base")
    categories = models.ManyToManyField(to=Category)
    availibility = models.BooleanField()

class Review(models.Model):
    user = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    perfume = models.ForeignKey(to=Perfume, on_delete=models.PROTECT)
    content = models.TextField()
    rate = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)