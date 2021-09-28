import React, { useState, useContext } from "react";
import { Link } from 'react-router-dom'
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { LoggedInContext } from "../index";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Box from "@mui/material/Box";

export default function Header() {

    //Drawerの表示状態
    const [isOpen, setIsOpen] = useState(false);

    const loggedInContext = useContext(LoggedInContext)!
    const [isLoggedIn] = [loggedInContext.isLoggedIn];

    // Drawerを表示するか閉じかの処理
    const toggleDrawer = (open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setIsOpen(open);
    };

    //ListItemの名前とLink先の対応関係
    const linkDict:{[index:string]: string} = {
        'Home': "",
        "Experiment": "experiment",
        "Create PlayList": "create-playlist",
    }

    const list = () => (
        <Box
            component={"div"}
            role={"presentation"}
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            sx={{
                width: 250,
            }}
        >
            <List>
                {['Home'].map((text, index) => (
                    <Link to={"/" + linkDict[text]} key={text}>
                        <ListItem button key={text}>
                            <ListItemText primary={text} />
                        </ListItem>
                    </Link>
                ))}
                {isLoggedIn && (
                    ['Experiment', 'Create PlayList'].map((text, index) => (
                        <Link to={"/" + linkDict[text]} key={text}>
                            <ListItem button key={text}>
                                <ListItemText primary={text} />
                            </ListItem>
                        </Link>
                    ))
                )}
            </List>
        </Box>
    )

    return (
        <Box
            component={"div"}
            sx={{
                flexGrow: 1,
                marginBottom: 15,
            }}
        >
            <AppBar position={"fixed"} sx={{bgcolor: "#3f51b5"}}>
                <Toolbar>
                    <IconButton
                        edge={"start"}
                        size={"large"}
                        color={"inherit"}
                        aria-label={"menu"}
                        onClick={toggleDrawer(true)}
                        sx={{
                            mr: 2
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Drawer open={isOpen} onClose={toggleDrawer(false)}>
                        {list()}
                    </Drawer>
                    <Typography variant={"h6"} component={"div"} sx={{ flexGrow: 1, mr: 1 }}>
                        PositiveMoodPlayList
                    </Typography>
                    {!isLoggedIn && (
                        <LoginButton />
                    )}
                    {isLoggedIn && (
                        <LogoutButton />
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}