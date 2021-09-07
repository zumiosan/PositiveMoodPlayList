#!usr/bin/env python
# -*- cording: utf-8 -*-

from environs import Env
import psycopg2

env = Env()
env.read_env()


def create_transition(transition, up_down_info):
    if transition == 0:
        transition = [
            "ll",
            "ll",
            "lm",
            "lm",
            "lm",
            "mm",
            "mm",
            "mm",
            "mh",
            "mh",
            "hh",
            "hh"
        ]
        up_down_info = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

    elif transition == 5:
        transition = [
            "hh",
            "hh",
            "mh",
            "mh",
            "mh",
            "mm",
            "mm",
            "mm",
            "lm",
            "lm",
            "ll",
            "ll",
        ]
        up_down_info = [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]

    return transition, up_down_info


def get_class_name(class_num):
    """
    クラス名を返す
    :param class_num: クラス番号
    :return: クラス名
    """
    # クラス名の取得
    if class_num == 1:
        class_name = "hh"
    elif class_num == 2:
        class_name = "mh"
    elif class_num == 3:
        class_name = "mm"
    elif class_num == 4:
        class_name = "lm"
    elif class_num == 5:
        class_name = "ll"
    else:
        class_name = None

    return class_name


def get_class_number(class_name):
    """
    クラス番号を返す
    :param class_name: クラスの名前
    :return: クラス番号
    """
    # クラス番号の取得
    if class_name == "hh":
        class_num = 1
    elif class_name == "mh":
        class_num = 2
    elif class_name == "mm":
        class_num = 3
    elif class_name == "lm":
        class_num = 4
    elif class_name == "ll":
        class_num = 5
    else:
        class_num = None

    return class_num


def get_connection():
    return psycopg2.connect(env("DATABASE_POSITIVE_MOOD_PLAYLIST_URL"))


def execute_query(query):
    """
    クエリの実行
    :return: 実行結果
    """
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(query)
            rows = cur.fetchall()

    return rows


def get_first_data(class_name, class_num, username):
    query = "SELECT * FROM impression_info " \
            "WHERE username='{username}' and class_num={class_num} " \
            "and {class_name} >= 0.8 ORDER BY random() LIMIT 1;" \
        .format(username=username, class_num=class_num, class_name=class_name)
    data = execute_query(query)
    # print(data)
    return data


def not_change_class_data(before_class_proba, current_class_name, current_class_num, next_class_name, next_class_num,
                          up_down, username):
    query = None
    if current_class_num == next_class_num or next_class_num == 0:
        if up_down == 1:
            upper_class_proba = before_class_proba[current_class_num - 2]
            upper_class_name = get_class_name(current_class_num - 1)
            if current_class_num - 2 == -1:
                upper_class_proba = before_class_proba[current_class_num - 1]
                upper_class_name = current_class_name

            query = "SELECT * FROM impression_info " \
                    "WHERE username='{username}' and class_num={current_class_num} " \
                    "and {current_class_name} >= 0.8 " \
                    "and {upper_class_name} >= {upper_class_proba} " \
                    "ORDER BY random() LIMIT 1;" \
                .format(username=username,
                        current_class_num=current_class_num,
                        current_class_name=current_class_name,
                        upper_class_name=upper_class_name,
                        upper_class_proba=upper_class_proba,
                        )
        elif up_down == -1:
            try:
                lower_class_proba = before_class_proba[current_class_num]
                lower_class_name = get_class_name(current_class_num + 1)
            except IndexError:
                lower_class_proba = before_class_proba[current_class_num - 1]
                lower_class_name = current_class_name

            query = "SELECT * FROM impression_info " \
                    "WHERE username='{username}' and class_num={current_class_num} " \
                    "and {current_class_name} >= 0.8 " \
                    "and {lower_class_name} >= {lower_class_proba} " \
                    "ORDER BY random() LIMIT 1;" \
                .format(username=username,
                        current_class_num=current_class_num,
                        current_class_name=current_class_name,
                        lower_class_name=lower_class_name,
                        lower_class_proba=lower_class_proba,
                        )
    elif current_class_num != next_class_num:
        query = "SELECT * FROM impression_info " \
                "WHERE username='{username}' and class_num={current_class_num} " \
                "and {current_class_name} >= 0.8 " \
                "and {next_class_name} >= {next_class_proba} " \
                "ORDER BY random() LIMIT 1;"\
            .format(username=username,
                    current_class_num=current_class_num,
                    current_class_name=current_class_name,
                    next_class_name=next_class_name,
                    next_class_proba=before_class_proba[next_class_num - 1])

    data = execute_query(query)
    # print(data)

    return data


def change_class_data(current_class_name, current_class_num, before_class_name, username):
    query = "SELECT * FROM impression_info WHERE username='{username}' and class_num={current_class_num} " \
            "and {current_class_name} >= 0.8 " \
            "and {before_class_name} >= 0.7 " \
            "ORDER BY random() LIMIT 1;" \
        .format(username=username,
                current_class_num=current_class_num,
                current_class_name=current_class_name,
                before_class_name=before_class_name)
    data = execute_query(query)
    # print(data)
    return data


def create_playlist(transition, up_down_info, username):
    """
    印象に基づいてプレイリストを生成する
    """
    if type(transition) is int:
        transition, up_down_info = create_transition(transition, up_down_info)

    break_flag = len(transition)
    while True:
        mid = []
        music_data = []
        for index, (current_class_name, up_down) in enumerate(zip(transition, up_down_info)):
            # print(index)
            # 現在の楽曲のクラスの番号
            current_class_num = get_class_number(current_class_name)

            # 次の楽曲のクラス番号
            try:
                next_class_name = transition[index + 1]
                next_class_num = get_class_number(next_class_name)
            except IndexError:
                next_class_name = None
                next_class_num = 0

            # 最初の曲を決める
            if index == 0:
                data = get_first_data(current_class_name, current_class_num, username)
                mid.append(data[0][0])
                before_data_proba = data[0][3:-1]
                before_class_num = current_class_num
                before_class_name = current_class_name
                music_data.append(data[0])
                # print(mid)
                # print(current_class_num)
                # print(before_data_proba)
                continue

            # 2曲目以降
            if before_class_num == current_class_num:
                data = not_change_class_data(before_data_proba, current_class_name, current_class_num, next_class_name,
                                             next_class_num, up_down, username)
            elif before_class_num != current_class_num:
                data = change_class_data(current_class_name, current_class_num, before_class_name, username)
            try:
                mid.append(data[0][0])
                before_data_proba = data[0][3:-1]
                # print(before_data_proba)
                music_data.append(data[0])
            except IndexError:
                break

            # 現在の楽曲のクラス番号と名前を保存しておく
            before_class_num = current_class_num
            before_class_name = current_class_name
            # print(mid, music_data)

        if len(mid) == break_flag:
            break

    return mid
