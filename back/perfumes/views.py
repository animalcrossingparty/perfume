from django.shortcuts import render, redirect
from .models import Perfume, Note, Category, Brand
# Create your views here.

def selected_perfumes(request):
    perfumes = request.