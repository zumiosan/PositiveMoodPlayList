import React, { Fragment, useContext, useRef } from "react";
import { styled } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import { PlayerContext } from "./MusicPlayer";

const TinyText = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

export default function PlayerSlider() {

    const playerContext = useContext(PlayerContext)!;
    const [duration, position, setPosition, setIsSeek] = [
        playerContext.duration,
        playerContext.position,
        playerContext.setPosition,
        playerContext.setIsSeek,
    ];

    //ポジション変更時
    const handleMovePosition = (value:number) => {
        setPosition(value);
    };

    //シーククリック時
    const handleMouseDown = () => {
        setIsSeek(true);
    };

    //シークから離れた時
    const handleMouseUp = () => {
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
                    value={position}
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
                <TinyText>{formatDuration(position)}</TinyText>
                <TinyText>-{formatDuration(duration - position)}</TinyText>
            </Grid>
        </Fragment>
    )
}