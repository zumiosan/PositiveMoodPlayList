from django.urls import path
from .views import GetExperimentInfoView, CreatePlaylistView


urlpatterns = [
    path('exinfo/', GetExperimentInfoView.as_view()),
    path('create/', CreatePlaylistView.as_view()),
]
