import React, { Fragment } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import TagFacesIcon from '@mui/icons-material/TagFaces';

const impressions = [
    "High",
    "Middle High",
    "Middle",
    "Low Middle",
    "Low",
]

export default function ImpressionMenu() {
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
            <Grid item sx={{display: { xs: 'none', sm: 'inline' }}}>
                <IconButton
                    sx={{
                        color:"white",
                    }}
                    onClick={handleClick}
                >
                    <TagFacesIcon />
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
                    {impressions.map((text) => (
                        <MenuItem key={text} onClick={handleClose}>{text}</MenuItem>
                    ))}
                </Menu>
            </Grid>
        </Fragment>
    )
}