# Generated by Django 4.0.3 on 2022-07-20 12:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('songs', '0003_song_collectionartistviewurl'),
    ]

    operations = [
        migrations.AddField(
            model_name='song',
            name='collectionArtistName',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AddField(
            model_name='song',
            name='collectionHdPrice',
            field=models.FloatField(default=0.0),
        ),
        migrations.AddField(
            model_name='song',
            name='contentAdvisoryRating',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AddField(
            model_name='song',
            name='hasITunesExtras',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='song',
            name='longDescription',
            field=models.CharField(default='', max_length=1000),
        ),
        migrations.AddField(
            model_name='song',
            name='shortDescription',
            field=models.CharField(default='', max_length=1000),
        ),
        migrations.AddField(
            model_name='song',
            name='trackHdPrice',
            field=models.FloatField(default=0.0),
        ),
        migrations.AddField(
            model_name='song',
            name='trackHdRentalPrice',
            field=models.FloatField(default=0.0),
        ),
        migrations.AddField(
            model_name='song',
            name='trackRentalPrice',
            field=models.FloatField(default=0.0),
        ),
        migrations.AlterField(
            model_name='song',
            name='artistName',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AlterField(
            model_name='song',
            name='artistViewUrl',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AlterField(
            model_name='song',
            name='artworkUrl100',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AlterField(
            model_name='song',
            name='artworkUrl30',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AlterField(
            model_name='song',
            name='artworkUrl60',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AlterField(
            model_name='song',
            name='collectionCensoredName',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AlterField(
            model_name='song',
            name='collectionExplicitness',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AlterField(
            model_name='song',
            name='collectionName',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AlterField(
            model_name='song',
            name='collectionPrice',
            field=models.FloatField(default=0.0),
        ),
        migrations.AlterField(
            model_name='song',
            name='collectionViewUrl',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AlterField(
            model_name='song',
            name='country',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AlterField(
            model_name='song',
            name='currency',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AlterField(
            model_name='song',
            name='isStreamable',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='song',
            name='kind',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AlterField(
            model_name='song',
            name='previewUrl',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AlterField(
            model_name='song',
            name='primaryGenreName',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AlterField(
            model_name='song',
            name='releaseDate',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AlterField(
            model_name='song',
            name='trackCensoredName',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AlterField(
            model_name='song',
            name='trackExplicitness',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AlterField(
            model_name='song',
            name='trackName',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AlterField(
            model_name='song',
            name='trackPrice',
            field=models.FloatField(default=0.0),
        ),
        migrations.AlterField(
            model_name='song',
            name='trackViewUrl',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AlterField(
            model_name='song',
            name='wrapperType',
            field=models.CharField(default='', max_length=200),
        ),
    ]
