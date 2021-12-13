#!usr/bin/env python
# -*- cording: utf-8 -*-
import pprint

from environs import Env
import psycopg2
from psycopg2.extras import DictCursor

env = Env()
env.read_env()

impressions = ['hh', 'mh', 'mm', 'lm', 'll']

pleasure_level = 0.8

class_name_to_num = {
    'hh': 1,
    'mh': 2,
    'mm': 3,
    'lm': 4,
    'll': 5,
}

class_num_to_name = {
    1: 'hh',
    2: 'mh',
    3: 'mm',
    4: 'lm',
    5: 'll',
}


def get_connection():
    return psycopg2.connect(
        dsn=env("DATABASE_POSITIVE_MOOD_PLAYLIST_URL"),
        cursor_factory=DictCursor
    )


def execute_query(query):
    """
    クエリの実行
    :return: 実行結果
    """
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(query)
            rows = []
            for row in cur:
                rows.append(dict(row))
    return rows


def get_first_data(class_name, class_num, impression_username, pleasure_username):
    """
    最初の楽曲を取得
    """

    query = f"WITH table1 AS (SELECT * FROM impression_info WHERE username='{impression_username}')," \
            f"table2 AS (SELECT * FROM pleasure_info WHERE username='{pleasure_username}')," \
            f"table3 AS (SELECT * FROM table1 INNER JOIN table2 ON table1.mid = table2.mid "\
            "SELECT * FROM table3 " \
            f"WHERE class_num={class_num} AND {class_name} >= 0.8 AND pleasure >= {pleasure_level} " \
            f"ORDER BY random() LIMIT 1;"
    data = execute_query(query)
    return data


def not_change_class_data(before_class_proba, current_class_name, current_class_num, up_down, impression_username, pleasure_username):
    """
    印象が遷移しない場合の楽曲を取得
    """
    query = None
    if up_down == 1:  # 印象がHighに近づく場合
        # 一つ上の印象の印象確率とクラス名
        try:
            upper_class_proba = before_class_proba[class_num_to_name[current_class_num - 1]]
            upper_class_name = class_num_to_name[current_class_num - 1]
        except KeyError:  # 今がHighの場合はHighを使用
            upper_class_proba = before_class_proba[class_num_to_name[current_class_num]]
            upper_class_name = current_class_name

        # 実行するクエリ
        # 印象がHighに近づく場合：一つ上の印象の印象確率が上がる
        query = f"WITH table1 AS (SELECT * FROM impression_info WHERE username='{impression_username}'), " \
                f"table2 AS (SELECT * FROM pleasure_info WHERE username='{pleasure_username}'), " \
                f"table3 AS (SELECT * FROM table1 INNER JOIN table2 ON table1.mid = table2.mid " \
                f"SELECT * FROM table3 " \
                f"WHERE class_num={current_class_num} and {current_class_name} >= 0.8 AND pleasure >= {pleasure_level} " \
                f"AND {upper_class_name} >= {upper_class_proba} " \
                f"ORDER BY random() LIMIT 1;"

    elif up_down == -1:  # 印象がLowに近づく場合
        # 一つ下の印象確率とクラス名
        try:
            lower_class_proba = before_class_proba[class_num_to_name[current_class_num + 1]]
            lower_class_name = class_num_to_name[current_class_num + 1]
        except KeyError:  # 今がLowの場合はLowを使用
            lower_class_proba = before_class_proba[class_num_to_name[current_class_num]]
            lower_class_name = current_class_name

        # 実行するクエリ
        # 印象がLowに近づく場合：一つ下の印象の印象確率が上がる．
        query = f"WITH table1 AS (SELECT * FROM impression_info WHERE username='{impression_username}'), " \
                f"table2 AS (SELECT * FROM pleasure_info WHERE username='{pleasure_username}'), " \
                f"table3 AS (SELECT * FROM table1 INNER JOIN table2 ON table1.mid = table2.mid " \
                f"SELECT * FROM table3 " \
                f"WHERE class_num={current_class_num} and {current_class_name} >= 0.8 " \
                f"AND pleasure >= {pleasure_level} " \
                f"AND {lower_class_name} >= {lower_class_proba} " \
                f"ORDER BY random() LIMIT 1;"

    # クエリ実行
    data = execute_query(query)
    # print(data)
    return data


def change_class_data(current_class_name, current_class_num, before_class_name, impression_username, pleasure_username):
    """
    印象が遷移する場合
    """
    query = f"WITH table1 AS (SELECT * FROM impression_info WHERE username='{impression_username}'), " \
            f"table2 AS (SELECT * FROM pleasure_info WHERE username='{pleasure_username}'), " \
            f"table3 AS (SELECT * FROM table1 INNER JOIN table2 ON table1.mid = table2.mid " \
            f"SELECT * FROM table3 " \
            f"WHERE class_num={current_class_num} " \
            f"and {current_class_name} >= 0.8 " \
            f"and {before_class_name} >= 0.7 " \
            f"and pleasure >= {pleasure_level} " \
            f"ORDER BY random() LIMIT 1;"
    data = execute_query(query)
    # print(data)
    return data


def create_playlist(transition, up_down_info, impression_username, pleasure_username):
    """
    印象と快不快度に基づいてプレイリストを生成する
    transition: 印象の遷移
    up_down_info: 印象が上がるのか下がるのかの情報
    impression_username: 印象のテーブルを検索する用のユーザー名
    pleasure_username: 快不快のテーブルを検索する用のユーザ名
    """
    # プレイリスト作成終了フラグ
    break_flag = len(transition)

    while True:
        # プレイリストに使用する楽曲のmidを格納する
        mid = []
        music_data = []
        for index, (current_class_name, up_down) in enumerate(zip(transition, up_down_info)):
            # print(index)
            # 現在の楽曲のクラスの番号
            current_class_num = class_name_to_num[current_class_name]

            # 次の楽曲のクラス番号
            try:
                next_class_name = transition[index + 1]
                next_class_num = class_name_to_num[next_class_name]
            except IndexError:
                next_class_name = None
                next_class_num = 0

            # 最初の曲を決める
            if index == 0:
                # データの取得
                data = get_first_data(current_class_name, current_class_num, impression_username, pleasure_username)
                # midをlistに格納
                mid.append(data[0]['mid'])
                # 現在の印象確率を保持しておく
                before_data_proba = {}
                for impression in impressions:
                    before_data_proba[impression] = data[0][impression]
                # 現在のクラス番号，クラス名を保持
                before_class_num = current_class_num
                before_class_name = current_class_name

                music_data.append(data[0])
                # print(mid)
                # print(current_class_num)
                # print(before_data_proba)
                continue

            # 2曲目以降
            if before_class_num == current_class_num:  # 印象が遷移しない場合
                data = not_change_class_data(before_data_proba, current_class_name, current_class_num, next_class_name,
                                             next_class_num, up_down, impression_username, pleasure_username)
            elif before_class_num != current_class_num:  # 印象が遷移する場合
                data = change_class_data(current_class_name, current_class_num, before_class_name, impression_username, pleasure_username)
            try:
                # midを格納
                mid.append(data[0]['mid'])

                # 現在の印象確率を保持
                before_data_proba = {}
                for impression in impressions:
                    before_data_proba[impression] = data[0][impression]
                # print(before_data_proba)

                music_data.append(data[0])
            except IndexError:  # 候補楽曲がなかった場合はIndexError
                break

            # 現在の楽曲のクラス番号と名前を保持
            before_class_num = current_class_num
            before_class_name = current_class_name
            # print(mid, music_data)

        # プレイリストが完成したらループを抜ける
        if len(mid) == break_flag:
            break

    # for i in music_data:
    #     print('hh:{0}, mh:{1}, mm:{2}, lm:{3}, ll:{4}'.format(
    #         i['hh'],
    #         i['mh'],
    #         i['mm'],
    #         i['lm'],
    #         i['ll'],
    #     ))

    return mid
