import React, { Fragment, useContext, useRef, useState, createContext, useEffect } from "react";
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
import ReactHowler from "react-howler";

const impressions = [
    'LL',
    'LM',
    'MM',
    'MH',
    'HH',
]

interface PlayerContextInterface {
    duration: number,
    position: number,
    setPosition: React.Dispatch<React.SetStateAction<number>>,
    setVolume: React.Dispatch<React.SetStateAction<number>>,
}

export const PlayerContext = createContext<PlayerContextInterface | null>(null);

export default function MusicPlayer() {

    // オーディオプレイヤーオブジェクト
    const player = useRef<ReactHowler | null>(null);

    //　プレイリストの楽曲
    const playListContext = useContext(PlayListContext)!;
    const [playList] = [playListContext.playList];

    // 楽曲ファイルのパス
    const [src, setSrc] = useState<string>('http://goldfirestudios.com/proj/howlerjs/sound.ogg');

    // 再生中かどうか
    const [isPlay, setIsPlay] = useState<boolean>(false);

    // 曲の長さ(秒)
    const [duration, setDuration] = useState<number>(0);

    // 再生場所
    const [position, setPosition] = useState<number>(0);

    // ボリューム
    const [volume, setVolume] = useState<number>(50);

    // setInterval用の変数
    const interval = useRef<NodeJS.Timer | null>();

    // 子コンポーネントに送るもの
    const playerContext: PlayerContextInterface = {
        duration: duration,
        position: position,
        setPosition: setPosition,
        setVolume: setVolume,
    }

    // 再生ボタンを押した時
    const handlePlay = () => {
        setIsPlay(true);
        interval.current = setInterval(getPosition, 1000);
    };

    // 一時停止ボタンを押した時
    const handlePause = () => {
        setIsPlay(false);
        clearInterval(Number(interval.current));
    };

    // 楽曲ファイルを読み込んだ時
    const handleOnLoad = () => {
        console.log(player.current!.duration());
        setDuration(Math.floor(player.current!.duration()));
    }

    // 再生場所の取得
    const getPosition = () => {
        setPosition(Math.floor(player.current!.seek()));
    }

    // 再生箇所の変更
    useEffect(() => {
        player.current!.seek(position);
    }, [position])

    // 再生が終了した時
    const handleOnEnd = () => {

    };

    return (
        <Fragment>
            <ReactHowler
                src={src}
                playing={isPlay}
                volume={volume / 100}
                onLoad={handleOnLoad}
                ref={(ref) => (player.current = ref)}
            />
            <PlayerContext.Provider value={playerContext}>
                <Box component={"footer"} sx={{
                    width: "100%",
                    maxHeight: "20%",
                    position: "fixed",
                    bottom: "0",
                    bgcolor: "#3f51b5"
                }}>
                    <Grid container justifyContent={"center"} alignItems={"center"} spacing={2}>
                        <Grid item container xs={2} sm={4}>
                            <Grid item sx={{display: { xs: 'block', sm: 'none' }}}>
                                <ImpressionMenu />
                            </Grid>
                            <Grid item sx={{display: { xs: 'block', sm: 'none' }}}>
                                <ImpressionWordMenu />
                            </Grid>
                        </Grid>
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
                            <Grid item sx={{display: { xs: 'none', sm: 'inline' }}}>
                                <ImpressionMenu />
                            </Grid>
                            <Grid item sx={{display: { xs: 'none', sm: 'inline' }}}>
                                <ImpressionWordMenu />
                            </Grid>
                            <Grid item sx={{display: { xs: 'block', sm: 'inline' }}}>
                                <VolumeButton />
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </PlayerContext.Provider>
        </Fragment>
    );
};