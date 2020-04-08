from django.db import models

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
    thumbnail = models.ImageField()
    gender = models.CharField(max_length=20)
    brand = models.ForeignKey(to=Brand, on_delete=models.PROTECT)
    note = models.ManyToManyField(to=Note)
    category = models.ManyToManyField(to=Category)
    availibility = models.BooleanField()