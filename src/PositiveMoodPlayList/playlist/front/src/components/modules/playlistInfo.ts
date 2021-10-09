
export const playlistPattern: string[] = [
    "Random",
    "Mood_Boosting_pattern1",
    "Mood_Boosting_pattern2",
    "Mood_Boosting_pattern3",
    "Mood_Boosting_pattern4",
    "Mood_Stabilizing_pattern1",
    "Mood_Stabilizing_pattern2",
    "Mood_Stabilizing_pattern3",
    "Mood_Stabilizing_pattern4",
]

export const playlistNumber: {[p: string]: string} = {
    "0": "Random",
    "1": "Mood_Boosting_pattern1",
    "2": "Mood_Boosting_pattern2",
    "3": "Mood_Boosting_pattern3",
    "4": "Mood_Boosting_pattern4",
    "5": "Mood_Stabilizing_pattern1",
    "6": "Mood_Stabilizing_pattern2",
    "7": "Mood_Stabilizing_pattern3",
    "8": "Mood_Stabilizing_pattern4",
}

export const playlistImage: {[p: string]: string} = {
    "Mood_Boosting_pattern1": "/asset/up_p1.png",
    "Mood_Boosting_pattern2": "/asset/up_p2.png",
    "Mood_Boosting_pattern3": "/asset/up_p3.png",
    "Mood_Boosting_pattern4": "/asset/up_p4.png",
    "Mood_Stabilizing_pattern1": "/asset/down_p1.png",
    "Mood_Stabilizing_pattern2": "/asset/down_p2.png",
    "Mood_Stabilizing_pattern3": "/asset/down_p3.png",
    "Mood_Stabilizing_pattern4": "/asset/down_p4.png",
    "Random": "/asset/random.png"
}

export const impressionTransition: {[p: string]: {[p: string]: string[] | number[]}} = {
    "Mood_Boosting_pattern1": {
        "transition": ["ll", "ll", "lm", "lm", "lm", "mm", "mm", "mm", "mh", "mh", "hh", "hh"],
        "up_down_info": [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    },
    "Mood_Boosting_pattern2": {
        "transition": ["ll", "lm", "lm", "mm", "mm", "mh", "mh", "mh", "hh", "hh", "hh", "hh"],
        "up_down_info": [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    },
    "Mood_Boosting_pattern3": {
        "transition": ["ll", "ll", "ll", "ll", "lm", "lm", "lm", "mm", "mm", "mh", "mh", "hh"],
        "up_down_info": [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    },
    "Mood_Boosting_pattern4": {
        "transition": ["ll", "lm", "mm", "mm", "mh", "mm", "mm", "lm", "mm", "mm", "mh", "hh"],
        "up_down_info": [0, 1, 1, 1, 1, -1, -1, -1, -1, 1, 1, 1],
    },
    "Mood_Stabilizing_pattern1": {
        "transition": ["hh", "hh", "mh", "mh", "mh", "mm", "mm", "mm", "lm", "lm", "ll", "ll"],
        "up_down_info": [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    },
    "Mood_Stabilizing_pattern2": {
        "transition": ["hh", "hh", "hh", "hh", "mh", "mh", "mh", "mm", "mm", "lm", "lm", "ll"],
        "up_down_info": [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    },
    "Mood_Stabilizing_pattern3": {
        "transition": ["hh", "mh", "mh", "mm", "mm", "lm", "lm", "lm", "ll", "ll", "ll", "ll"],
        "up_down_info": [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    },
    "Mood_Stabilizing_pattern4": {
        "transition": ["hh", "mh", "mm", "mm", "lm", "mm", "mm", "mh", "mm", "mm", "lm", "ll"],
        "up_down_info": [0, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1],
    },
}