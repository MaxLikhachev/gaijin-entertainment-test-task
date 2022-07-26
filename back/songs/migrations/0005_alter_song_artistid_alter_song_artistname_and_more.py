# Generated by Django 4.0.3 on 2022-07-27 16:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('songs', '0004_song_collectionartistname_song_collectionhdprice_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='song',
            name='artistId',
            field=models.IntegerField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name='song',
            name='artistName',
            field=models.CharField(default='', max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='song',
            name='artistViewUrl',
            field=models.CharField(default='', max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='song',
            name='artworkUrl100',
            field=models.CharField(default='', max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='song',
            name='artworkUrl30',
            field=models.CharField(default='', max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='song',
            name='artworkUrl60',
            field=models.CharField(default='', max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='song',
            name='collectionArtistId',
            field=models.IntegerField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name='song',
            name='collectionArtistName',
            field=models.CharField(default='', max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='song',
            name='collectionArtistViewUrl',
            field=models.CharField(default='', max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='song',
            name='collectionCensoredName',
            field=models.CharField(default='', max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='song',
            name='collectionExplicitness',
            field=models.CharField(default='', max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='song',
            name='collectionHdPrice',
            field=models.FloatField(default=0.0, null=True),
        ),
        migrations.AlterField(
            model_name='song',
            name='collectionId',
            field=models.IntegerField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name='song',
            name='collectionName',
            field=models.CharField(default='', max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='song',
            name='collectionPrice',
            field=models.FloatField(default=0.0, null=True),
        ),
        migrations.AlterField(
            model_name='song',
            name='collectionViewUrl',
            field=models.CharField(default='', max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='song',
            name='contentAdvisoryRating',
            field=models.CharField(default='', max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='song',
            name='country',
            field=models.CharField(default='', max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='song',
            name='currency',
            field=models.CharField(default='', max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='song',
            name='discCount',
            field=models.IntegerField(default=1, null=True),
        ),
        migrations.AlterField(
            model_name='song',
            name='discNumber',
            field=models.IntegerField(default=1, null=True),
        ),
        migrations.AlterField(
            model_name='song',
            name='hasITunesExtras',
            field=models.BooleanField(default=False, null=True),
        ),
        migrations.AlterField(
            model_name='song',
            name='isStreamable',
            field=models.BooleanField(default=False, null=True),
        ),
        migrations.AlterField(
            model_name='song',
            name='kind',
            field=models.CharField(default='', max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='song',
            name='longDescription',
            field=models.CharField(default='', max_length=1000, null=True),
        ),
        migrations.AlterField(
            model_name='song',
            name='previewUrl',
            field=models.CharField(default='', max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='song',
            name='primaryGenreName',
            field=models.CharField(default='', max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='song',
            name='releaseDate',
            field=models.CharField(default='', max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='song',
            name='shortDescription',
            field=models.CharField(default='', max_length=1000, null=True),
        ),
        migrations.AlterField(
            model_name='song',
            name='trackCensoredName',
            field=models.CharField(default='', max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='song',
            name='trackCount',
            field=models.IntegerField(default=1, null=True),
        ),
        migrations.AlterField(
            model_name='song',
            name='trackExplicitness',
            field=models.CharField(default='', max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='song',
            name='trackHdPrice',
            field=models.FloatField(default=0.0, null=True),
        ),
        migrations.AlterField(
            model_name='song',
            name='trackHdRentalPrice',
            field=models.FloatField(default=0.0, null=True),
        ),
        migrations.AlterField(
            model_name='song',
            name='trackId',
            field=models.IntegerField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name='song',
            name='trackName',
            field=models.CharField(default='', max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='song',
            name='trackNumber',
            field=models.IntegerField(default=1, null=True),
        ),
        migrations.AlterField(
            model_name='song',
            name='trackPrice',
            field=models.FloatField(default=0.0, null=True),
        ),
        migrations.AlterField(
            model_name='song',
            name='trackRentalPrice',
            field=models.FloatField(default=0.0, null=True),
        ),
        migrations.AlterField(
            model_name='song',
            name='trackTimeMillis',
            field=models.IntegerField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name='song',
            name='trackViewUrl',
            field=models.CharField(default='', max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='song',
            name='wrapperType',
            field=models.CharField(default='', max_length=200, null=True),
        ),
    ]
