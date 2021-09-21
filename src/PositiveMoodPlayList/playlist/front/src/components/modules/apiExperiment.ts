import axios from "axios";
import {apiURL} from "../../index";

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"

// 実験トップ画面のデータ取得
export async function getExperimentInfo() {
    const res = await axios.get(
        `${apiURL}playlist/expt-info/`,
        { withCredentials: true }
    );
    if (res.status == 200) {
        return res.data;
    }
    return false;
}

export async function completeExperiment(data: { ex_id: string; playlist_mid: number[]; is_finished: boolean }) {
    const res = await axios.put(
        `${apiURL}playlist/expt-info/`,
        data,
        { withCredentials: true }
    );
    return res.status == 200;
}