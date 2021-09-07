from django.urls import path
from .views import ExperimentInfoView, CreatePlaylistView


urlpatterns = [
    path('exinfo/', ExperimentInfoView.as_view()),
    path('create/', CreatePlaylistView.as_view()),
]
