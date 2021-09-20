from rest_framework import generics, permissions, status
from rest_framework.validators import ValidationError
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Account
from .serializers import AccountSerializer


class AccountRegister(generics.CreateAPIView):
    """
    アカウント登録を行う
    """
    permission_classes = [permissions.AllowAny]
    authentication_classes = []
    serializer_class = AccountSerializer
    queryset = Account.objects.all()

    def perform_create(self, serializer):
        queryset = Account.objects.filter(username=self.request.data['username'])
        if queryset.exists():
            raise ValidationError('This username has already used')
        serializer.save()


class GetAccountInfo(APIView):
    """
    アカウント情報を取得する
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response(data={
            'username': request.user.username,
        },
            status=status.HTTP_200_OK
        )
