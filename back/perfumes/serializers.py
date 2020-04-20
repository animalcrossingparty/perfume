from rest_framework import serializers
from .models import Perfume

class PerfumeSerializers(serializers.ModelSerializer):
    class Meta:
        model = Perfume
        fields = ['id','name','launch_date','thumbnail','gender','categories','availibility','season', 't_notes', 'h_notes', 'b_notes']

class PerfumeDetailSerializers(serializers.ModelSerializer):
    class Meta:
        model = Perfume
        fields = '__all__'