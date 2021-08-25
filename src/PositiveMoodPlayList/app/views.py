from django.http.request import validate_host
from rest_framework import generics, permissions
from rest_framework.validators import ValidationError
from rest_framework.response import Response
from .models import Account
from .serializers import RegistrationSerializer


class AccountRegister(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = RegistrationSerializer
    queryset = Account.objects.all()

    def perform_create(self, serializer):
        queryset = Account.objects.filter(username=self.request.data['username'])
        if queryset.exists():
            raise ValidationError('This username has already used')
        serializer.save()
