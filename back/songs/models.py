from django.db import models

# Create your models here.


class Song(models.Model):
    wrapperType = models.CharField(max_length=200)
    kind = models.CharField(max_length=200)
    artistId = models.IntegerField(default=0)
    collectionId = models.IntegerField(default=0)
    trackId = models.IntegerField(default=0)
    artistName = models.CharField(max_length=200)
    collectionName = models.CharField(max_length=200)
    trackName = models.CharField(max_length=200)
    collectionCensoredName = models.CharField(max_length=200)
    trackCensoredName = models.CharField(max_length=200)
    artistViewUrl = models.CharField(max_length=200)
    collectionViewUrl = models.CharField(max_length=200)
    trackViewUrl = models.CharField(max_length=200)
    previewUrl = models.CharField(max_length=200)
    artworkUrl30 = models.CharField(max_length=200)
    artworkUrl60 = models.CharField(max_length=200)
    artworkUrl100 = models.CharField(max_length=200)
    collectionPrice = models.FloatField()
    trackPrice = models.FloatField()
    releaseDate = models.CharField(max_length=200)
    collectionExplicitness = models.CharField(max_length=200)
    trackExplicitness = models.CharField(max_length=200)
    discCount = models.IntegerField(default=1)
    discNumber = models.IntegerField(default=1)
    trackCount = models.IntegerField(default=1)
    trackNumber = models.IntegerField(default=1)
    trackTimeMillis = models.IntegerField(default=0)
    country = models.CharField(max_length=200)
    currency = models.CharField(max_length=200)
    primaryGenreName = models.CharField(max_length=200)
    isStreamable = models.BooleanField()

    def __str__(self):
        return self.trackName
