import React from "react";
import { useCookies } from 'react-cookie';
import {get, useForm} from "react-hook-form";
import { useHistory } from "react-router-dom";
import { apiURL } from "../index";

export default function Login() {
    // ページ遷移の際に利用する.
    const history = useHistory();

    // Cookieを扱う
    const [cookie, setCookie] = useCookies();
    // フォーム
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    // APIにusername, passwordを送信してJWTトークンを取得してCookieに保存
    const getJwt = async(data: object) => {
        console.log(data);
        const res = await fetch(
            `${apiURL}token/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        );
        const jwtToken = await res.json();
        console.log(jwtToken)
        setCookie('accesstoken', jwtToken['access'], { path: '/', httpOnly: true });
        setCookie('refreshtoken', jwtToken['refresh'], { path: '/', httpOnly: true });
        history.push('/');
    }

    return(
        <div>
            <h1>Login</h1>
            <div className="login">
                <form onSubmit={handleSubmit(getJwt)}>
                    <input className="form-control" {...register("username")} placeholder="username"/>
                    <input className="form-control" type={"password"} {...register("password")} placeholder="password"/>
                    <input className="btn" type={"submit"} value={"ログイン"}/>
                </form>
            </div>
        </div>
    );
}