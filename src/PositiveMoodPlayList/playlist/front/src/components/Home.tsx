import React from "react";
import Typography from "@mui/material/Typography";
import Divider  from "@mui/material/Divider";
import Grid from "@mui/material/Grid";

export default function Home() {


    return(
        <Grid container spacing={3}>
            <Grid item container>
                <Grid item container justifyContent={"center"} xs={12}>
                    <Grid item xs={10}>
                        <Typography variant="h6" gutterBottom>
                            このシステムについて
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item container justifyContent={"center"} xs={12}>
                    <Grid item xs={10}>
                        <Divider />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container justifyContent={"center"} xs={12}>
                <Grid item xs={10}>
                    <Typography variant={"body1"} gutterBottom>
                        楽曲に対する印象に基づいてプレイリストを設計し，ユーザの気分をポジティブに変化させます．
                        また，印象を個人化することで個人に合わせたプレイリストを生成します．
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}