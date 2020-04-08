from django.db import models
from django.contrib.auth import get_user_model
from perfumes.models import Perfume

class Review(models.Model):
    user = models.ForeignKey(to=get_user_model(), on_delete=models.PROTECT)
    perfume = models.ForeignKey(to=Perfume, on_delete=models.PROTECT)
    content = models.TextField()
    rate = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)