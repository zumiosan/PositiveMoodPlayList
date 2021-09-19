from django.http import JsonResponse
from django.conf import settings
from rest_framework import status, response, permissions
from rest_framework.views import APIView
from rest_framework_simplejwt import views as jwt_views
from rest_framework_simplejwt import exceptions as jwt_exp


class TokenObtainView(jwt_views.TokenObtainPairView):
    """
    JWTをCookieにセットして送る
    """
    def post(self, request, *args, **kwargs):
        # シリアライザーでバリデーションを行う．
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except jwt_exp.TokenError as e:
            raise jwt_exp.InvalidToken(e.args[0])

        # レスポンスオブジェクトの作成
        res = response.Response(status=status.HTTP_200_OK)

        # Cookieの設定
        res.set_cookie(
            key="access_token",
            value=serializer.validated_data["access"],
            # max_age=60 * 60 * 24,
            expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
            httponly=True,
        )
        res.set_cookie(
            key="refresh_token",
            value=serializer.validated_data["refresh"],
            # max_age=60 * 60 * 24 * 30,
            expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
            httponly=True,
        )
        return res


class ReturnRefreshTokenView(APIView):
    """
    リフレッシュトークンを返す
    """
    def get(self, request):
        try:
            token = request.COOKIES["refresh_token"]
            return JsonResponse({"refresh": token}, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return response.Response(status=status.HTTP_400_BAD_REQUEST)


class TokenRefreshView(jwt_views.TokenRefreshView):
    """
    リフレッシュトークンを使って新しいアクセストークンを作成する
    """
    def post(self, request, *args, **kwargs):
        # シリアライザーによるバリデーション
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except jwt_exp.TokenError as e:
            raise jwt_exp.InvalidToken(e.args[0])

        # レスポンスオブジェクトの作成
        res = response.Response(status=status.HTTP_200_OK)
        res.delete_cookie("access_token")
        res.set_cookie(
            "access_token",
            serializer.validated_data["access"],
            # max_age=60 * 24 * 24 * 30,
            expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
            httponly=True,
        )
        return res


class TokenDeleteView(APIView):
    """
    Cookieに保存しているTokenを削除する
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        res = response.Response(status=status.HTTP_200_OK)
        res.delete_cookie("access_token")
        res.delete_cookie("refresh_token")
        return res


