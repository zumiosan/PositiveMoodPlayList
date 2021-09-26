import React, { Fragment, useContext, useRef, useState, createContext} from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PlayerSlider from "./PlayerSlider";
import ImpressionMenu from "./ImpressionMenu";
import ImpressionWordMenu from "./ImpressionWordMenu";
import IconButton from "@mui/material/IconButton";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { PlayListContext } from "../index";
import VolumeButton from "./VolumeButton";

const impressions = [
    'LL',
    'LM',
    'MM',
    'MH',
    'HH',
]

interface PlayerContextInterface {
    duration: number,
    setPosition: React.Dispatch<React.SetStateAction<number>>,
    setVolume: React.Dispatch<React.SetStateAction<number>>,
}

export const PlayerContext = createContext<PlayerContextInterface | null>(null);

export default function MusicPlayer() {


    //　プレイリストの楽曲
    const playListContext = useContext(PlayListContext)!;
    const [playList] = [playListContext.playList];

    // 再生中かどうか
    const [isPlay, setIsPlay] = useState<boolean>(false);

    // 曲の長さ(秒)
    const duration = useRef<number>(300);

    // 再生場所
    const [position, setPosition] = useState<number>(50);

    // ボリューム
    const [volume, setVolume] = useState<number>(50);

    // 子コンポーネントに送るもの
    const playerContext: PlayerContextInterface = {
        duration: duration.current,
        setPosition: setPosition,
        setVolume: setVolume,
    }

    const handlePlay = () => {
        setIsPlay(true);
    };

    const handlePause = () => {
        setIsPlay(false);
    };

    return (
        <Fragment>
            <PlayerContext.Provider value={playerContext}>
                <Box component={"footer"} sx={{
                    width: "100%",
                    maxHeight: "20%",
                    position: "fixed",
                    bottom: "0",
                    bgcolor: "#3f51b5"
                }}>
                    <Grid container justifyContent={"center"} alignItems={"center"} spacing={2}>
                        <Grid item xs={2} sm={4}>

                        </Grid>
                        <audio src={'sample.wav'} controls style={{display: "none"}} />
                        <Grid item container xs={8} sm={4}>
                            <Grid item container xs={12} alignItems={"center"} justifyContent={"center"}>
                                <Grid item>
                                    <IconButton>
                                        <SkipPreviousIcon sx={{color:"white", fontSize:"150%"}} />
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    {isPlay ? (
                                        <IconButton onClick={handlePause}>
                                            <PauseCircleIcon sx={{color:"white", fontSize:"150%"}} />
                                        </IconButton>
                                    ) : (
                                        <IconButton onClick={handlePlay}>
                                            <PlayCircleIcon sx={{color:"white", fontSize:"150%"}} />
                                        </IconButton>
                                    )}
                                </Grid>
                                <Grid item>
                                    <IconButton >
                                        <SkipNextIcon sx={{color:"white", fontSize:"150%"}} />
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <PlayerSlider />
                        </Grid>
                        <Grid item container xs={2} sm={4} justifyContent={"center"} spacing={1}>
                            <ImpressionMenu />
                            <ImpressionWordMenu />
                            <VolumeButton />
                        </Grid>
                    </Grid>
                </Box>
            </PlayerContext.Provider>
        </Fragment>
    );
};