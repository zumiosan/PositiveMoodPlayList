from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .models import ExperimentInfo, MusicInfo
from .modules import CreatePlayList, ExperimentDataList, CreatePlayListPleasure
from .serializers import ExperimentInfoSerializer, MusicInfoSerializer, PlayListInfoSerializer
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


class ExperimentCreatePlayListView(APIView):
    """
    実験用のプレイリストを作成する．
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        query_set = ExperimentInfo.objects.filter(username=request.user.username, ex_id=request.data['ex_id'])
        serializer = ExperimentInfoSerializer(instance=query_set, many=True)
        playlist_type = ExperimentDataList.experiment_playlist_pattern[serializer.data[0]['playlist_type']]
        if playlist_type["is_random"]:
            data_list = get_random_data()
        else:
            data_list = get_playlist_data(playlist_type, request.user.username)
        save_playlist_info(data_list, request.user.username)

        return Response(data=data_list, status=status.HTTP_200_OK)


class CreatePlaylistView(APIView):
    """
    プレイリストを生成する．
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        data_list = get_playlist_data(request.data, request.user.username)
        save_playlist_info(data_list, request.user.username)

        return Response(data=data_list, status=status.HTTP_200_OK)


class CreateRandomPlayListView(APIView):
    """
    ランダムプレイリストを生成する．
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        data_list = get_random_data()
        save_playlist_info(data_list, request.user.username)

        return Response(data=data_list, status=status.HTTP_200_OK)


class MusicInfoView(APIView):
    """
    楽曲情報に関するView
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        """指定された楽曲の情報を返す"""
        data = request.data
        print(data)
        # query_set = MusicInfo.objects.filter(mid=)
        return Response(status=status.HTTP_200_OK)


def get_playlist_data(data, user_name='test'):
    """
    プレイリストを取得する
    """

    if data['is_personal_pleasure']:
        if data['is_personalize']:
            mid = CreatePlayListPleasure.create_playlist(data['transition'], data['up_down_info'], user_name, user_name)
        else:
            mid = CreatePlayListPleasure.create_playlist(data['transition'], data['up_down_info'], 'test', user_name)
    elif data['is_common_pleasure']:
        if data['is_personalize']:
            mid = CreatePlayListPleasure.create_playlist(data['transition'], data['up_down_info'], user_name, 'test')
        else:
            mid = CreatePlayListPleasure.create_playlist(data['transition'], data['up_down_info'], 'test', 'test')
    elif data['is_personalize']:
        mid = CreatePlayList.create_playlist(data['transition'], data['up_down_info'], user_name)
    else:
        mid = CreatePlayList.create_playlist(data['transition'], data['up_down_info'], 'test')

    data_list = []
    for i in mid:
        query_set = MusicInfo.objects.filter(mid=i)
        serializer = MusicInfoSerializer(instance=query_set, many=True)
        data_list.append(serializer.data[0])

    return data_list


def get_random_data():
    """
    ランダム設計のプレイリストを作成する
    """
    data_list = []
    query_set = MusicInfo.objects.order_by('?')[:12]
    serializer = MusicInfoSerializer(instance=query_set, many=True)
    for i in serializer.data:
        data_list.append(i)

    return data_list


def save_playlist_info(data_list, username):
    """
    プレイリスト情報を保存する
    """
    mid = []
    for data in data_list:
        mid.append(data['mid'])

    playlist_info = {
        'playlist_mid': mid,
        'username': username,
    }

    serializer = PlayListInfoSerializer(data=playlist_info)
    serializer.is_valid()
    serializer.save()


