from django.db import models
from django.conf import settings

class Brand(models.Model):
    # def brand_image_path(self, instance, filename):
    #     return 'brand_image' + instance.brand.name + '/' + randstr(5) + '.' + filename.split('.')[-1]

    name = models.CharField(max_length=100)
    logo_image = models.CharField(max_length=200, null=True)

class Category(models.Model):
    name = models.CharField(max_length=50)

class Note(models.Model):
    name = models.CharField(max_length=100)
    kor_name = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.name

class Season(models.Model):
    name = models.CharField(max_length=20)
    kor_name = models.CharField(max_length=20)

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
    
class Review(models.Model):
    user = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    perfume = models.ForeignKey(to=Perfume, on_delete=models.PROTECT)
    content = models.TextField()
    rate = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    # 좋아요 누른 유저 칼럼 accounts.user에 만들어 놓았습니당