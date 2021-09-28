import React, { Fragment } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LoyaltyIcon from '@mui/icons-material/Loyalty';

const impressionWords = [
    "Cute",
    "Cool",
    "Happy",
]

export default function ImpressionWordMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
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
                <LoyaltyIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                transformOrigin={{ vertical: "bottom", horizontal: "center" }}
                PaperProps={{
                    style: {
                        maxHeight: 100 * 4.5
                    },
                }}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
            >
                {impressionWords.map((text) => (
                    <MenuItem key={text} onClick={handleClose}>{text}</MenuItem>
                ))}
            </Menu>
        </Fragment>
    )
}