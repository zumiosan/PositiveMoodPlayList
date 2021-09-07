from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .models import ExperimentInfo
from .modules import CreatePlayList
from .serializers import ExperimentInfoSerializer
from django.core.exceptions import ObjectDoesNotExist


class ExperimentInfoView(APIView):
    """
    実験情報に関するView．
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        """実験情報の取得を行う"""
        query_set = ExperimentInfo.objects.filter(username=request.user.username).order_by('ex_id')
        serializer = ExperimentInfoSerializer(instance=query_set, many=True)
        return Response(serializer.data, status.HTTP_200_OK)

    def put(self, request):
        """実験情報の更新を行う"""
        if type(request.data) is not dict:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        try:
            query_set = ExperimentInfo.objects.get(username=request.user.username, ex_id=request.data['ex_id'])
        except (ObjectDoesNotExist, KeyError):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        serializer = ExperimentInfoSerializer(instance=query_set, data=request.data)
        serializer.is_valid()
        serializer.save()
        return Response(status=status.HTTP_200_OK)


class CreatePlaylistView(APIView):
    """
    プレイリストを生成する．
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        mid = CreatePlayList.create_playlist(0, 0, 'test')
        # print(mid)
        return Response(data=mid, status=status.HTTP_200_OK)
