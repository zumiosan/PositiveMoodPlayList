from django.contrib import admin
from .models import ExperimentInfo, MusicInfo, ImpressionInfo

admin.site.register(ExperimentInfo)
admin.site.register(MusicInfo)
admin.site.register(ImpressionInfo)
