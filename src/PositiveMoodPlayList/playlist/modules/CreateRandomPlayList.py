#!usr/bin/env python
# -*- cording: utf-8 -*-
import pprint

from environs import Env
import psycopg2
from psycopg2.extras import DictCursor

env = Env()
env.read_env()


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


def get_data():
    """
    ランダムに曲を取得
    """
    query = "SELECT * FROM impression_info WHERE username='test' ORDER BY random() LIMIT 12;"
    data = execute_query(query)
    print(data)
    return data


def create_playlist():
    """
    ランダムプレイリストを生成する
    """

    # プレイリストに使用する楽曲のmidを格納する
    return [i['mid'] for i in get_data()]

