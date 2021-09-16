from django.urls import path, include
from rest_framework import routers
from .views import AccountRegister, GetAccountInfo
from .jwtView import TokenObtainView, TokenRefresh


urlpatterns = [
    path('register/', AccountRegister.as_view()),
    path('get/', GetAccountInfo.as_view()),
    path('login/', TokenObtainView.as_view()),
    path('refresh/', TokenRefresh.as_view()),
]

