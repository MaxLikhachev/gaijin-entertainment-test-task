# Generated by Django 4.0.3 on 2022-07-20 12:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('songs', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='song',
            name='collectionArtistId',
            field=models.IntegerField(default=0),
        ),
    ]
