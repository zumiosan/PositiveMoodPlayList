import axios from "axios";
import {apiURL} from "../../index";

// ログイン処理用
export async function login(data: {[index: string]: string}) {
    const res = await axios.post(
        `${apiURL}account/login/`,
        data,
        { withCredentials: true }
    );
    return res.status == 200;
}

// ログアウト処理用
export async function logout() {
    const res = await axios.get(
        `${apiURL}account/logout/`,
        { withCredentials: true }
    );
    return res.status == 200;
}

// リフレッシュトークン取得用
export async function getRefreshToken() {
    const res = await axios.get(
        `${apiURL}account/refresh-token/`,
        { withCredentials: true }
    );
    return res;
}

// トークンのリフレッシュ用
export async function refreshToken(data: {[index:string]: string}) {
    const res = await axios.post(
        `${apiURL}account/refresh/`,
        data,
        {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials : true
        }
    );
    return res.status == 200;
}