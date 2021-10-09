import React, {useContext, useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Button, TextField, Grid, Alert, AlertTitle } from "@mui/material";
import { LoggedInContext } from "../index";
import { login } from "./modules/apiJwt";

export default function Login() {
    // ページ遷移の際に利用する.
    const history = useHistory();

    //ログイン状態を切り替える用
    const loggedInContext = useContext(LoggedInContext)!;
    const [isLoggedIn, setIsLoggedIn] = [loggedInContext.isLoggedIn, loggedInContext.setLoggedIn];

    // フォーム
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    // ログインに成功したかどうか
    const [isSuccess, setIsSuccess] = useState(true);

    // APIにusername, passwordを送信してJWTトークンを取得してCookieに保存
    const getJwt = async(data: {[index: string]: string}) => {
        const res = await login(data);
        if (res) {
            setIsLoggedIn(true);
            setIsSuccess(true);
            history.push('/');
        } else {
            setIsSuccess(false);
        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            history.push('/');
        }
    }, [])

    return(
        <Grid container alignItems={"center"} justifyContent={"center"}>
            {!isSuccess && (
                <Grid item xs={12}>
                    <Alert severity={"error"}>
                        <AlertTitle>Error</AlertTitle>
                        ユーザ名またはパスワードが違います．
                    </Alert>
                </Grid>
            )}
            <Grid item xs={12}>
                <div style={{textAlign: "center"}}>
                    <h2>ログインフォーム</h2>
                </div>
            </Grid>
            <Grid item xs={12}>
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