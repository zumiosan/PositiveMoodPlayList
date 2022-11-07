import React, {Fragment, useContext, useEffect, useRef, useState} from "react";
import { styled } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import { PlayerContext } from "./MusicPlayer";
import raf from 'raf';


const TinyText = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

export default function PlayerSlider() {

    // 親から受け取ったもの
    const playerContext = useContext(PlayerContext)!;
    const [duration, player, isPlay] = [
        playerContext.duration,
        playerContext.player,
        playerContext.isPlay,
    ];

    // シークバーのポジション
    const [seekPosition, setSeekPosition] = useState<number>(0);

    // シークバーをクリックしているかどうか
    const [isSeek, setIsSeek] = useState<boolean>(false);

    // アニメーションフレーム用の変数
    const raf_id = useRef<number | null>();

    // プレイリストの再生が始まった時とシークバーを動かした時の処理
    useEffect(() => {
        if (isPlay) {
            // raf_id.current = raf(getPosition);
            getPosition()
        }
        return () => raf.cancel(raf_id.current!)
    }, [isPlay, isSeek])

    // ポジションを取得する処理
    const getPosition  = () => {
        // console.log(isSeek)
        if (!isSeek) {
            setSeekPosition(Math.floor(player?.seek()));
        }
        if (isPlay) {
            raf_id.current = raf(getPosition);
        }
    }

    //ポジション変更時
    const handleMovePosition = (value:number) => {
        setSeekPosition(value)
    };

    //シーククリック時
    const handleMouseDown = () => {
        raf.cancel(raf_id.current!)
        setIsSeek(true);
    };

    //シークから離れた時に再生箇所を変更
    const handleMouseUp = () => {
        player?.seek(seekPosition);
        raf.cancel(raf_id.current!)
        setIsSeek(false);
    };

    // 再生時間のフォーマット
    function formatDuration(value: number) {
        const minute = Math.floor(value / 60);
        const secondLeft = value - minute * 60;
        return `${minute}:${secondLeft < 9 ? `0${secondLeft}` : secondLeft}`;
    }

    return (
        <Fragment>
            <Grid item xs={12}>
                <Slider
                    aria-label="time-indicator"
                    size="small"
                    value={seekPosition}
                    min={0}
                    step={1}
                    max={duration}
                    onChange={(_, value) => handleMovePosition(value as number)}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    sx={{
                        color: "white",
                        '& .MuiSlider-thumb': {
                            width: 8,
                            height: 8,
                            transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                            '&.Mui-active': {
                                width: 20,
                                height: 20,
                            },
                        },
                    }}
                />
            </Grid>
            <Grid
                item
                container
                sx={{
                    justifyContent:"space-between",
                    alignItems:"center",
                    color:"white",
                    mt: -2,
                }}
            >
                <TinyText>{formatDuration(seekPosition)}</TinyText>
                <TinyText>-{formatDuration(duration - seekPosition)}</TinyText>
            </Grid>
        </Fragment>
    )
}