from django.db import models
from django.contrib.postgres.fields import ArrayField

class ExperimentInfo(models.Model):
    """
    実験に使う情報
    """
    user_id = models.CharField(verbose_name='ユーザID', max_length=255)
    ex_id = models.IntegerField(verbose_name='実験番号', default=0)
    playlist_type = models.IntegerField(verbose_name='プレイリストのタイプ', default=0)
    playlist_mid = ArrayField(models.IntegerField(), verbose_name='プレイリストの楽曲', default=[])

