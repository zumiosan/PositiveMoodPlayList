from django.urls import path
from .views import GetExperimentInfo


urlpatterns = [
    path('exinfo/', GetExperimentInfo.as_view()),
]
