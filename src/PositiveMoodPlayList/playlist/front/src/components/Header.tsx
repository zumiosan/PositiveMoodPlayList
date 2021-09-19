import React, { useState, useContext } from "react";
import { Link } from 'react-router-dom'
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { LoggedInContext } from "../index";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      root: {
          flexGrow: 1,
          marginBottom: 15
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
      },
      list: {
        width: 250,
      },
      fullList: {
          width: 'auto'
      },
  }),
);

export default function Header() {
    // UI用のstyle
    const classes = useStyles();

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
        "Create PlayList": "create_playlist",
    }

    const list = () => (
        <div
            className={classes.list}
            role={"presentation"}
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
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
        </div>
    )

    return (
        <div className={classes.root}>
            <AppBar position={"static"}>
                <Toolbar>
                    <IconButton
                        edge={"start"}
                        className={classes.menuButton}
                        color={"inherit"}
                        aria-label={"menu"}
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Drawer open={isOpen} onClose={toggleDrawer(false)}>
                        {list()}
                    </Drawer>
                    <Typography variant={"h6"} className={classes.title}>
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
        </div>
    );
}