import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Button, TextField, Grid } from "@material-ui/core";
import { apiURL } from "../index";
import { LoggedInContext } from "../index";
import axios from "axios";

export default function Login() {
    // ページ遷移の際に利用する.
    const history = useHistory();

    //ログイン状態を切り替える用
    const loggedInContext = useContext(LoggedInContext)!;
    const [setIsLoggedIn] = [loggedInContext.setLoggedIn];

    // フォーム
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    // APIにusername, passwordを送信してJWTトークンを取得してCookieに保存
    const getJwt = async(data: {[index: string]: string}) => {
        const res = await axios.post(
            `${apiURL}account/login/`,
            data,
            { withCredentials: true }
        );
        console.log(res)
        setIsLoggedIn(true);
        history.push('/');
    }

    return(
        <Grid container alignItems={"center"} justifyContent={"center"}>
            <Grid item xs={8}>
                <div style={{textAlign: "center"}}>
                    <h2>ログインフォーム</h2>
                </div>
            </Grid>
            <Grid item xs={8}>
                <form onSubmit={handleSubmit(getJwt)}>
                    <Grid container alignItems={"center"} justifyContent={"center"} spacing={10}>
                        <Grid item xs={8}>
                            <TextField
                                label="username"
                                id="control-username"
                                required
                                fullWidth
                                {...register('username')}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                label="password"
                                id="control-password"
                                required
                                type="password"
                                fullWidth
                                {...register('password')}
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