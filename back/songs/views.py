from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Song

# Create your views here.


@csrf_exempt
def index(request, data={'status': 'Successfully done!'}):
    if request.method == 'GET':
        data = Song.objects.all()
    elif request.method == 'POST':
        Song.objects.create(**json.loads(request.body))
    elif request.method == 'PUT':
        Song.objects.filter(id=json.loads(request.body)['id']).update(
            **json.loads(request.body))
    elif request.method == 'DELETE':
        for object in json.loads(request.body):
            Song.objects.filter(id=object['id']).delete()
    return HttpResponse(serializers.serialize('json', data), content_type='application/json')
