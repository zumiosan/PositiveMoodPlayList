from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.utils import timezone

class Account(models.Model):
    """
    アカウント
    """
    class Meta:
        db_table = 'account'
    
    id = models.BigAutoField(primary_key=True)
    user_id = models.CharField(verbose_name='ユーザID', max_length=255)
    user_password = models.CharField(verbose_name='パスワード', max_length=255)
    create_date = models.DateTimeField(verbose_name='作成日', default=timezone.now)
    login_date = models.DateTimeField(verbose_name='ログイン日', default=timezone.now)



class ExperimentInfo(models.Model):
    """
    実験に使う情報
    """
    class Meta:
        db_table = 'experiment_info'
    
    id = models.BigAutoField(primary_key=True)
    user_id = models.ForeignKey(Account, on_delete=models.PROTECT)
    ex_id = models.IntegerField(verbose_name='実験番号', default=0)
    playlist_type = models.IntegerField(verbose_name='プレイリストのタイプ', default=0)
    playlist_mid = ArrayField(models.IntegerField(), verbose_name='プレイリストの楽曲', default=[])


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
    user_id = models.ForeignKey(Account, on_delete=models.PROTECT)
    class_num = models.IntegerField(verbose_name='クラス番号', default=1)
    proba_hh = models.FloatField(verbose_name='High', default=0.00)
    proba_mh = models.FloatField(verbose_name='MHigh', default=0.00)
    proba_mm = models.FloatField(verbose_name='Middle', default=0.00)
    proba_lm = models.FloatField(verbose_name='LMiddle', default=0.00)
    proba_ll = models.FloatField(verbose_name='Low', default=0.00)


# class PleasureInfo(models.Model):


