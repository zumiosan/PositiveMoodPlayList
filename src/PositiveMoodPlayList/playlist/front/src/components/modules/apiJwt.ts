import axios from "axios";
import {apiURL} from "../../index";

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"

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
    try {
        const res = await axios.get(
        `${apiURL}account/refresh-token/`,
        { withCredentials: true }
        );
        return res.data;
    } catch (e: any) {
        return false
    }
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

// ユーザー情報の取得
export async function getUserInfo() {
    try {
        const res = await axios.get(
        `${apiURL}account/get/`,
        { withCredentials: true }
        );
        return true;
    } catch (e: any) {
        // console.log(e.response);
        return false;
    }
}

// リフレッシュ処理
export async function refresh() {
    const token = await getRefreshToken();
    if (!token) { return false }
    const res = await refreshToken(token);
    return res
}