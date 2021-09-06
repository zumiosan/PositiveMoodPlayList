from django.urls import path
from .views import GetExperimentInfoView


urlpatterns = [
    path('exinfo/', GetExperimentInfoView.as_view()),
]
