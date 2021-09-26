import React, { Fragment, useContext ,useState } from "react";
import { PlayListContext } from "../index";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

const impressions = [
    'LL',
    'LM',
    'MM',
    'MH',
    'HH',
]

export default function MusicPlayer() {

    //　プレイリストの楽曲
    const playListContext = useContext(PlayListContext)!;
    const [playList] = [playListContext.playList];

    // 再生中かどうか
    const [isPlay, setIsPlay] = useState<boolean>(false);

    const handlePlay = () => {
        setIsPlay(true);
    };

    const handlePause = () => {
        setIsPlay(false);
    };

    return (
        <Fragment>
            <Box component={"footer"} sx={{
                width: "100%",
                maxHeight: "20%",
                position: "fixed",
                bottom: "0",
                color: "#3f51b5"
            }}>
                <audio src={'sample.wav'} controls style={{display: "none"}}></audio>
                <Grid container justifyContent={"center"} alignItems={"center"} spacing={2}>
                    <Grid item container xs={12} sm={4} justifyContent={"center"} spacing={1}>
                        {
                            impressions.map((text) => (
                                <Grid item>
                                    <Button size={"small"} variant={"contained"}>{text}</Button>
                                </Grid>
                            ))
                        }
                    </Grid>
                    <Grid item container xs={10} sm={4}>
                        <Grid item container xs={12} alignItems={"center"} justifyContent={"center"}>
                            <Grid item>
                                <IconButton>
                                    <SkipPreviousIcon sx={{color:"white", fontSize:"large"}} />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                {isPlay ? (
                                    <IconButton onClick={handlePause}>
                                        <PauseCircleIcon sx={{color:"white", fontSize:"large"}} />
                                    </IconButton>
                                ) : (
                                    <IconButton onClick={handlePlay}>
                                        <PlayCircleIcon sx={{color:"white", fontSize:"large"}} />
                                    </IconButton>
                                )}
                            </Grid>
                            <Grid item>
                                <IconButton >
                                    <SkipNextIcon sx={{color:"white", fontSize:"large"}} />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            aaaa
                        </Grid>
                    </Grid>
                    <Grid item xs={2} sm={4}>

                    </Grid>
                </Grid>
            </Box>
        </Fragment>
    );
};