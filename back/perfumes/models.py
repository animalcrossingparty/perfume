from django.db import models
from django.conf import settings

class Image(models.Model):
    original = models.ImageField(upload_to='review/', blank=True)

class Brand(models.Model):
    name = models.CharField(max_length=100)
    image = models.CharField(null=True, max_length=100)


class Category(models.Model):
    name = models.CharField(max_length=50)


class Note(models.Model):
    name = models.CharField(max_length=100)
    kor_name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Season(models.Model):
    name = models.CharField(max_length=20)
    kor_name = models.CharField(max_length=20, blank=True)
p = Perfume.objects.prefetch_related('heart_notes').annotate(heart_cnt=Count('heart_notes', filter=Q(kor_name__in=['라일락', '로즈']))).order_by('-heart_cnt')

class Perfume(models.Model):
    name = models.CharField(max_length=200)
    launch_date = models.DateField(null=True, blank=True)
    thumbnail = models.CharField(max_length=200)
    gender = models.IntegerField(null=True)
    brand = models.ForeignKey(to=Brand, on_delete=models.PROTECT)
    top_notes = models.ManyToManyField(to=Note, related_name="perfumes_top")
    heart_notes = models.ManyToManyField(
        to=Note, related_name="perfumes_heart")
    base_notes = models.ManyToManyField(to=Note, related_name="perfumes_base")
    categories = models.ManyToManyField(to=Category)
    availability = models.BooleanField()
    seasons = models.ManyToManyField(to=Season)
    price = models.FloatField()
    recommended = models.CharField(max_length=500, blank=True)
    similar = models.CharField(max_length=500, blank=True)

class Review(models.Model):
    user = models.ForeignKey(
        to=settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    perfume = models.ForeignKey(to=Perfume, on_delete=models.PROTECT)
    content = models.TextField()
    rate = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    images = models.ManyToManyField(to=Image)
