from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Song

# Create your views here.


@csrf_exempt
def index(request):
    if request.method == 'GET':
        return HttpResponse(serializers.serialize('json', Song.objects.all()), content_type='application/json')
    if request.method == 'POST':
        print(json.loads(request.body))
        Song.objects.create(**json.loads(request.body))
        return HttpResponse(serializers.serialize('json', ''), content_type='application/json')
    if request.method == 'PUT':
        print(json.loads(request.body))
        Song.objects.filter(id=json.loads(request.body)['id']).update(**json.loads(request.body))
        return HttpResponse(serializers.serialize('json', ''), content_type='application/json')
    if request.method == 'DELETE':
        for object in json.loads(request.body):
            Song.objects.filter(id=object['id']).delete()
        return HttpResponse(serializers.serialize('json', ''), content_type='application/json')