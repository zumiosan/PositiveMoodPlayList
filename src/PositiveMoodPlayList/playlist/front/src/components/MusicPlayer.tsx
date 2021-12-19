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
import MusicInfo from "./MusicInfo";
import VolumeButton from "./VolumeButton";
import ReactHowler from "react-howler";
import Typography from "@mui/material/Typography";
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import {Link} from "react-router-dom";
import raf from 'raf';

interface PlayerContextInterface {
    duration: number,
    position: number,
    setIsSeek: React.Dispatch<React.SetStateAction<boolean>>,
    setPosition: React.Dispatch<React.SetStateAction<number>>,
    setVolume: React.Dispatch<React.SetStateAction<number>>,
}

export const PlayerContext = createContext<PlayerContextInterface | null>(null);

export default function MusicPlayer() {

    // オーディオプレイヤーオブジェクト
    const player = useRef<ReactHowler | null>(null);

    //　プレイリストの楽曲
    const playListContext = useContext(PlayListContext)!;
    const [playList, playListInfo] = [playListContext.playList, playListContext.playListInfo];

    // プレイリストの再生楽曲の箇所
    const [playListIndex, setPlayListIndex] = [playListContext.playListIndex, playListContext.setPlayListIndex];

    // 楽曲ファイルのパス
    const staticPath = '/static/music/'
    const [src, setSrc] = useState<string>(staticPath);

    // 再生中かどうか
    const [isPlay, setIsPlay] = useState<boolean>(false);

    // シークバーを動かしているかどうか
    const [isSeek, setIsSeek] = useState<boolean>(false);

    // 曲の長さ(秒)
    const [duration, setDuration] = useState<number>(0);

    // 再生場所
    const [position, setPosition] = useState<number>(0);

    // ボリューム
    const [volume, setVolume] = useState<number>(50);

    // setInterval用の変数
    const interval = useRef<NodeJS.Timer | null>();

    const raf_id = useRef<number | null>();

    // 子コンポーネントに送るもの
    const playerContext: PlayerContextInterface = {
        duration: duration,
        position: position,
        setIsSeek: setIsSeek,
        setPosition: setPosition,
        setVolume: setVolume,
    }

    // プレイリストが更新された時
    useEffect(() => {
        setPlayListIndex(0);
        const src = staticPath + String(playList[0]['mid']).padStart(6, '0') + '.wav';
        setSrc(src);
    }, [playList]);

    // 再生ボタンを押した時
    const handlePlay = () => {
        setIsPlay(true);
        // interval.current = setInterval(getPosition, 1);
        raf_id.current = raf(getPosition);
    };

    // 一時停止ボタンを押した時
    const handlePause = () => {
        setIsPlay(false);
        // clearInterval(Number(interval.current));
        clearRAF();
    };

    // 楽曲ファイルを読み込んだ時
    const handleOnLoad = () => {
        // console.log(player.current!.duration());
        setDuration(Math.floor(player.current!.duration()));
    }

    // 再生箇所の取得
    const getPosition = () => {
        if (!isSeek) {
            setPosition(Math.floor(player.current!.seek()));
        }
    }

    // 再生箇所の変更
    useEffect(() => {
        if (!isSeek) {
            player.current!.seek(position);
        }
    }, [isSeek])

    // 曲をセット
    useEffect(() => {
        // 再生をストップ
        player.current!.stop();

        // 次の曲をセット
        const src = staticPath + String(playList[playListIndex]['mid']).padStart(6, '0') + '.wav';
        setSrc(src);
        setPosition(0);
    }, [playListIndex]);

    // 次の曲を再生
    const handleNext = () => {
        // 次の楽曲がない場合は最初の楽曲をセットして停止
        if (playListIndex + 1 >= playList.length) {
            // clearInterval(Number(interval.current));
            clearRAF();
            setIsPlay(false);
            setPlayListIndex(0);
        } else {
            setPlayListIndex(prevState => prevState + 1);
        }
    };

    // 前の曲を再生
    const handlePrevious = () => {
        // 前の楽曲がない場合は停止
        if (playListIndex - 1 <= -1) {
            // clearInterval(Number(interval.current));
            clearRAF();
            setIsPlay(false);
            setPosition(0);
            player.current!.stop();
        } else {
            setPlayListIndex(prevState => prevState - 1);
        }
    };

    // 再生が終了した時
    const handleOnEnd = () => {
        handleNext();
    };

    const clearRAF = () => {
        raf.cancel(raf_id.current!);
    }

    return (
        <Fragment>
            <ReactHowler
                src={src}
                html5={true}
                playing={isPlay}
                volume={volume / 100}
                onLoad={handleOnLoad}
                onEnd={handleOnEnd}
                ref={(ref) => (player.current = ref)}
            />
            <PlayerContext.Provider value={playerContext}>
                <Box component={"footer"} sx={{
                    width: "100%",
                    maxHeight: "250px",
                    position: "fixed",
                    bottom: "0",
                    bgcolor: "#3f51b5"
                }}>
                    <Grid container justifyContent={"center"} alignItems={"center"} spacing={2}>
                        {playListInfo['type'] != null && (
                            <Grid
                                item
                                container
                                xs={12}
                                sx={{color: "white"}}
                                alignItems={"center"}
                                justifyContent={"center"}
                                spacing={1}
                            >
                                <Grid item container alignItems={"center"} justifyContent={"center"} xs={12} sm={6}>
                                    <Typography
                                        variant="caption"
                                        fontWeight={500}
                                        sx={{fontSize: { xs: 15, sm: 20}}}
                                    >
                                        Type: {playListInfo['type']}
                                    </Typography>
                                </Grid>
                                {playListInfo['type'] != 'Random' && (
                                    <Grid item container alignItems={"center"} justifyContent={"center"} xs={4} sm={2}>
                                        <Typography sx={{fontSize: { xs: 15, sm: 20}}}>
                                            Options:
                                        </Typography>
                                    </Grid>
                                )}
                                {playListInfo['isPersonalize'] && (
                                    <Grid item container alignItems={"center"} justifyContent={"center"} xs={4} sm={2}>
                                        <Typography sx={{fontSize: { xs: 15, sm: 20}}}>
                                            Personalize
                                        </Typography>
                                    </Grid>
                                )}
                                {playListInfo['isPleasure'] && (
                                    <Grid item container alignItems={"center"} justifyContent={"center"} xs={4} sm={2}>
                                        <Typography sx={{fontSize: { xs: 15, sm: 20}}}>
                                            Pleasure
                                        </Typography>
                                    </Grid>
                                )}
                            </Grid>
                        )}
                        <Grid
                            item
                            container
                            xs={12}
                            sx={{display: { sm: 'none'}, color: "white"}}
                            alignItems={"center"}
                            spacing={2}
                        >
                            <MusicInfo />
                        </Grid>
                        <Grid item container xs={2} sx={{display: { xs: 'block', sm: 'none' }}}>
                            <Grid item>
                                <ImpressionMenu />
                            </Grid>
                            <Grid item>
                                <ImpressionWordMenu />
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            container
                            sm={4}
                            alignItems={"center"}
                            color={"white"}
                            sx={{display: {xs: "none", sm: "inline-flex"}}}
                        >
                             <MusicInfo />
                        </Grid>
                        <Grid item container xs={8} sm={4}>
                            <Grid item container xs={12} alignItems={"center"} justifyContent={"center"}>
                                <Grid item>
                                    <IconButton onClick={handlePrevious}>
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
                                    <IconButton onClick={handleNext}>
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
                            <Grid item sx={{display: { xs: 'block', sm: 'inline' }}}>
                                {playListInfo['type'] != null ? (
                                    <IconButton>
                                        <Link to={"/detail-playlist"}>
                                            <QueueMusicIcon sx={{color: "white"}}  />
                                        </Link>
                                    </IconButton>
                                ) : (
                                    <IconButton>
                                        <QueueMusicIcon sx={{color: "white"}}  />
                                    </IconButton>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </PlayerContext.Provider>
        </Fragment>
    );
};