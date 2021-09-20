from django.urls import path
from .views import ExperimentInfoView, CreatePlaylistView


urlpatterns = [
    path('expt-info/', ExperimentInfoView.as_view()),
    path('create-playlist/', CreatePlaylistView.as_view()),
]
