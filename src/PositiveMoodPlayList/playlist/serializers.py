from rest_framework import serializers
from .models import ExperimentInfo


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
