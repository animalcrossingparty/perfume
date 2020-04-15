from rest_framework import serializers
from .models import Perfume


class PerfumeSerializers(serializers.ModelSerializer):
    class Meta:
        model = Perfume
        fields = '__all__'

class PerfumeDetailSerializers(serializers.ModelSerializer):
    class Meta:
        model = Perfume
        fields = '__all__'