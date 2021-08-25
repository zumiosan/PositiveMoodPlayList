from django.urls import path, include
from rest_framework import routers
from .views import AccountRegister, GetAccountInfo


urlpatterns = [
    path('register/', AccountRegister.as_view()),
    path('get/', GetAccountInfo.as_view()),
]

