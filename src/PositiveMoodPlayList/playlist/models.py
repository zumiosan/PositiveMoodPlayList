from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.conf import settings


class ExperimentInfo(models.Model):
    """
    実験に使う情報
    """

    class Meta:
        db_table = 'experiment_info'

    id = models.BigAutoField(primary_key=True)
    username = models.CharField(verbose_name='ユーザ名', max_length=255, null=False)
    ex_id = models.IntegerField(verbose_name='実験番号', default=0)
    playlist_type = models.IntegerField(verbose_name='プレイリストのタイプ', default=0)
    playlist_mid = ArrayField(models.IntegerField(), verbose_name='プレイリストの楽曲', default=list)
    is_finished = models.BooleanField(verbose_name='完了状態', default=False)


class MusicInfo(models.Model):
    """
    楽曲情報
    """

    class Meta:
        db_table = 'music_info'

    id = models.BigAutoField(primary_key=True)
    mid = models.IntegerField(verbose_name='楽曲番号', unique=True, null=None)
    sid = models.CharField(verbose_name='ファイル名', unique=True, max_length=255, null=None)
    music_name = models.CharField(verbose_name='曲名', max_length=255)
    artist_name = models.CharField(verbose_name='アーティスト名', max_length=255)


class ImpressionInfo(models.Model):
    """
    楽曲の印象情報
    """

    class Meta:
        db_table = 'impression_info'

    id = models.BigAutoField(primary_key=True)
    mid = models.ForeignKey(MusicInfo, on_delete=models.PROTECT)
    username = models.CharField(verbose_name='ユーザ名', max_length=255, unique=True)
    class_num = models.IntegerField(verbose_name='クラス番号', default=1)
    proba_hh = models.FloatField(verbose_name='High', default=0.00)
    proba_mh = models.FloatField(verbose_name='MHigh', default=0.00)
    proba_mm = models.FloatField(verbose_name='Middle', default=0.00)
    proba_lm = models.FloatField(verbose_name='LMiddle', default=0.00)
    proba_ll = models.FloatField(verbose_name='Low', default=0.00)

# class PleasureInfo(models.Model):


