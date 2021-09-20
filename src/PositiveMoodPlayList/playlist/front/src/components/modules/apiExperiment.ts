import axios from "axios";
import {apiURL} from "../../index";

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

export async function completeExperiment(data: {[index: string]: number}) {
    const res = await axios.put(
        `${apiURL}account/expt-info/`,
        data,
        { withCredentials: true }
    );
    return res.status == 200;
}