import React from "react";
import { useCookies } from 'react-cookie';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Button, TextField, Grid } from "@material-ui/core";
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
        setCookie('accesstoken', jwtToken['access'], { path: '/', httpOnly: false });
        setCookie('refreshtoken', jwtToken['refresh'], { path: '/', httpOnly: false });
        history.push('/');
    }

    return(
        <Grid container alignItems={"center"} justify={"center"} xs={12}>
            <Grid item xs={8}>
                <div style={{textAlign: "center"}}>
                    <h2>ログインフォーム</h2>
                </div>
            </Grid>
            <Grid item xs={8}>
                <form onSubmit={handleSubmit(getJwt)}>
                    <Grid container alignItems={"center"} justify={"center"} spacing={3}>
                        <Grid item xs={8}>
                            <TextField
                                label="username"
                                id="standard-basic"
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                label="password"
                                id="standard-basic"
                                required
                                type="password"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={8} style={{textAlign:"center"}}>
                            <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            >
                                ログイン
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );
}