import axios from "axios";
import {apiURL} from "../../index";

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"

export interface CreatePlayListInterface {
    transition: string[]
    up_down_info: number[]
    is_personalize: boolean
    is_pleasure: boolean
}

// プレイリストを作成
export async function createPlayList(data:CreatePlayListInterface): Promise<{[p:string]: number | string}[]> {
    const res = await axios.post(
        `${apiURL}playlist/create-playlist/`,
        data,
        { withCredentials: true }
    );
    if (res.status != 200) {
        throw Error
    }
    return res.data;
}

// ランダムのプレイリストを作成
export async function createRandomPlayList(): Promise<{[p:string]: number | string}[]> {
    const res = await axios.get(
        `${apiURL}playlist/create-random/`,
        { withCredentials: true }
    );
    if (res.status != 200) {
        throw Error
    }
    return res.data;
}