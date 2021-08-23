from django.urls import path, include
from rest_framework import routers
from .views import AccountRegister


urlpatterns = [
    path('register/', AccountRegister.as_view())
]

