from rest_framework import serializers
from .models import ExperimentInfo, MusicInfo, PlayListInfo


class ExperimentInfoSerializer(serializers.ModelSerializer):
    """
    実験情報用のシリアライザー
    """

    playlist_mid = serializers.ListField(
        child=serializers.IntegerField(min_value=0),
        write_only=True,
    )

    class Meta:
        model = ExperimentInfo
        fields = ['ex_id', 'is_finished', 'playlist_mid', 'playlist_type']


class MusicInfoSerializer(serializers.ModelSerializer):
    """
    楽曲情報用のシリアライザー
    """

    class Meta:
        model = MusicInfo
        fields = ['mid', 'music_name', 'artist_name']


class PlayListInfoSerializer(serializers.ModelSerializer):
    """
    作成されたプレイリスト情報用のシリアライザー
    """

    class Meta:
        model = PlayListInfo
        fields = ['playlist_mid', 'username']
