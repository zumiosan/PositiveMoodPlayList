import React, { Fragment, useContext } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {PlayListContext} from "../index";
import {PlayerContext} from "./MusicPlayer";

export default function MusicInfo() {

    const playListContext = useContext(PlayListContext)!;
    const [playList] = [playListContext.playList];
    const [playListIndex] = [playListContext.playListIndex];

    return (
        <Fragment>
            <Grid item xs={4}>
                <Typography textAlign={"center"}>
                    {String(playListIndex + 1) + '/' + String(playList.length) + '曲目'}
                </Typography>
            </Grid>
            <Grid item xs={8}>
                <Typography variant="caption" fontWeight={500}>
                    {playList[playListIndex]['artist_name']}
                </Typography>
                <Typography noWrap letterSpacing={-0.25}>
                    {playList[playListIndex]['music_name']}
                </Typography>
            </Grid>
        </Fragment>
    )
}