from django.shortcuts import render
from django.http import HttpResponse
from .models import Song
import json

# Create your views here.


def index(request):
    return HttpResponse("Hello, world. You're at the songs index.")