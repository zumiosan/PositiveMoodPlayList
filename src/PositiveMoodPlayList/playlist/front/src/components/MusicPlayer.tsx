import React, { Fragment, useContext } from "react";
import { PlayListContext } from "../index";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
    audio: {
        display: "none",
    },
    footer: {
        width: "100%",
        height: "10%",
        position: "fixed",
        bottom: "0",
    }

});

export default function MusicPlayer() {

    const classes = useStyles()

    //　プレイリストの楽曲
    const playListContext = useContext(PlayListContext)!;
    const [playList] = [playListContext.playList];

    return (
        <Fragment>
            <Box component={"footer"} className={classes.footer} bgcolor={"#3f51b5"}>
                <audio src={'sample.wav'} controls className={classes.audio}></audio>
                <Grid container>

                </Grid>
            </Box>
        </Fragment>
    );
};