from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .models import ExperimentInfo
from .modules import CreatePlayList


class GetExperimentInfoView(APIView):
    """
    実験情報を取得する．
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        query_set = ExperimentInfo.objects.filter(username=request.user.username).order_by('ex_id')
        data = []
        for res in query_set:
            tmp = {
                'ex_id': res.ex_id,
                'is_finished': res.is_finished
            }
            data.append(tmp)

        return Response(data=data, status=status.HTTP_200_OK)


class CreatePlaylistView(APIView):
    """
    プレイリストを生成する．
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        mid = CreatePlayList.create_playlist(0, 0, 'test')
        # print(mid)
        return Response(data=mid, status=status.HTTP_200_OK)
