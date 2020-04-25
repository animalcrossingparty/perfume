from django.db import models
from django.conf import settings

class Base64Image(models.Model):
    data = models.BinaryField()

class Brand(models.Model):
    name = models.CharField(max_length=100)
    logo_image = models.CharField(max_length=200, null=True)
    image = models.BinaryField(null=True)

class Category(models.Model):
    name = models.CharField(max_length=50)

class Note(models.Model):
    name = models.CharField(max_length=100)
    kor_name = models.CharField(max_length=100, blank=True)
    
    def __str__(self):
        return self.name

class Season(models.Model):
    name = models.CharField(max_length=20)
    kor_name = models.CharField(max_length=20, blank=True)

class Perfume(models.Model):
    name = models.CharField(max_length=200)
    launch_date = models.DateField(null=True, blank=True)
    thumbnail = models.CharField(max_length=200)
    gender = models.IntegerField(null=True)
    brand = models.ForeignKey(to=Brand, on_delete=models.PROTECT)
    top_notes = models.ManyToManyField(to=Note, related_name="perfumes_top")
    heart_notes = models.ManyToManyField(to=Note, related_name="perfumes_heart")
    base_notes = models.ManyToManyField(to=Note, related_name="perfumes_base")
    categories = models.ManyToManyField(to=Category)
    availability = models.BooleanField()
    seasons = models.ManyToManyField(to=Season)
    images = models.ManyToManyField(to=Base64Image)
    
class Review(models.Model):
    user = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    perfume = models.ForeignKey(to=Perfume, on_delete=models.PROTECT)
    content = models.TextField()
    rate = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    images = models.ManyToManyField(to=Base64Image)