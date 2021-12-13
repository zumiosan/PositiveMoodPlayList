#!usr/bin/env python
# -*- cording: utf-8 -*-

experiment_playlist_pattern = {
    # 個人印象のみ，盛り上げる
    0: {
        "transition": ["ll", "ll", "lm", "lm", "lm", "mm", "mm", "mm", "mh", "mh", "hh", "hh"],
        "up_down_info": [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        "is_personalize": True,
        "is_personal_pleasure": False,
        "is_common_pleasure": False,
        "is_random": False,
    },
    # 個人印象のみ，落ち着ける
    1: {
        "transition": ["hh", "hh", "mh", "mh", "mh", "mm", "mm", "mm", "lm", "lm", "ll", "ll"],
        "up_down_info": [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        "is_personalize": True,
        "is_personal_pleasure": False,
        "is_common_pleasure": False,
        "is_random": False,
    },
    # 個人印象，共通快不快度，盛り上げる
    2: {
        "transition": ["ll", "ll", "lm", "lm", "lm", "mm", "mm", "mm", "mh", "mh", "hh", "hh"],
        "up_down_info": [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        "is_personalize": True,
        "is_personal_pleasure": False,
        "is_common_pleasure": True,
        "is_random": False,
    },
    # 個人印象，共通快不快度，落ち着ける
    3: {
        "transition": ["hh", "hh", "mh", "mh", "mh", "mm", "mm", "mm", "lm", "lm", "ll", "ll"],
        "up_down_info": [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        "is_personalize": True,
        "is_personal_pleasure": False,
        "is_common_pleasure": True,
        "is_random": False,
    },
    # 個人印象，個人快不快度，盛り上げる
    4: {
        "transition": ["ll", "ll", "lm", "lm", "lm", "mm", "mm", "mm", "mh", "mh", "hh", "hh"],
        "up_down_info": [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        "is_personalize": True,
        "is_personal_pleasure": True,
        "is_common_pleasure": False,
        "is_random": False,
    },
    # 個人印象，個人快不快度，落ち着ける
    5: {
        "transition": ["hh", "hh", "mh", "mh", "mh", "mm", "mm", "mm", "lm", "lm", "ll", "ll"],
        "up_down_info": [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        "is_personalize": True,
        "is_personal_pleasure": True,
        "is_common_pleasure": False,
        "is_random": False,
    },

}