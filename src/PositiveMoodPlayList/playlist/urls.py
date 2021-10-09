from django.urls import path
from .views import ExperimentInfoView, CreatePlaylistView, MusicInfoView, ExperimentCreatePlayListView, CreateRandomPlayListView


urlpatterns = [
    path('expt-info/', ExperimentInfoView.as_view()),
    path('create-playlist/', CreatePlaylistView.as_view()),
    path('music-info/', MusicInfoView.as_view()),
    path('expt-playlist/', ExperimentCreatePlayListView.as_view()),
    path('create-random/', CreateRandomPlayListView.as_view()),
]
