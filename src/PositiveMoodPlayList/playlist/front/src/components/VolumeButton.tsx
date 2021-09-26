import React, { Fragment, useContext, useRef } from "react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import { PlayerContext } from "./MusicPlayer";

export default function VolumeButton() {

    const playerContext = useContext(PlayerContext)!;
    const [setVolume] = [playerContext.setVolume];

    //ボリュームの値
    const volume = useRef<number>(50);

    //ボリューム変更時
    const handleChangeVolume = (value:number) => {
        setVolume(value);
        volume.current = value;
    };

    // メニューの表示位置
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    //表示中かどうか
    const open = Boolean(anchorEl);

    // クリックしたとき
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    // 閉じる時
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Fragment>
            <IconButton
                sx={{
                    color:"white",
                }}
                onClick={handleClick}
            >
                <VolumeUpIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                transformOrigin={{ vertical: "bottom", horizontal: "center" }}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                PaperProps={{
                    style: {
                        maxHeight: 100 * 4.5,
                    },
                }}
            >
                <MenuItem>
                    <Box sx={{height: 200}}>
                        <Slider
                            sx={{
                                '& input[type="range"]': {
                                    WebkitAppearance: 'slider-vertical',
                                },
                            }}
                            orientation="vertical"
                            min={0}
                            max={100}
                            defaultValue={50}
                            value={volume.current}
                            onChange={(_, value) => handleChangeVolume(value as number)}
                        />
                    </Box>
                </MenuItem>
            </Menu>
        </Fragment>
    )
}