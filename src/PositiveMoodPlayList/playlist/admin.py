from django.contrib import admin
from .models import ExperimentInfo, MusicInfo, ImpressionInfo, PlayListInfo

admin.site.register(ExperimentInfo)
admin.site.register(MusicInfo)
admin.site.register(ImpressionInfo)
admin.site.register(PlayListInfo)
