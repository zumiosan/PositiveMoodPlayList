import React, { createContext, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {Switch, Route, BrowserRouter, Link} from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import Experiment from "./components/Experiment";
import ExperimentDetail from "./components/ExperimentDetail";
import {getUserInfo, refresh} from "./components/modules/apiJwt";
import MusicPlayer from "./components/MusicPlayer";
import Box from "@mui/material/Box";
import SelectPlayList from "./components/SelectPlayList";
import Home from "./components/Home";

export const apiURL = 'http://localhost:8000/';

interface PlayListContextInterface {
    playList: {[p: string]: string | number}[]
    setPlayList: React.Dispatch<React.SetStateAction<{[p: string]: string | number}[]>>
    playListInfo: {[p: string]: string | boolean | null}
    setPlayListInfo: React.Dispatch<React.SetStateAction<{[p: string]: string | boolean | null}>>
}

interface LoggedInContextInterface {
    isLoggedIn: boolean
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export const LoggedInContext = createContext<LoggedInContextInterface | null>(null)
export const PlayListContext = createContext<PlayListContextInterface | null>(null)

export default function App() {

    //ログイン状態
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    // プレイリスト再生楽曲リスト
    const [playList, setPlayList] = useState<{[index:string]: number | string}[]>([
        {
            "mid": 1255,
            "music_name": "aaa",
            "artist_name": "aaaaaa"
        },
        {
            "mid": 2303,
            "music_name": "bbb",
            "artist_name": "aaaaaa"
        },
    ]);

    // プレイリスト情報
    const [playListInfo, setPlayListInfo] = useState<{[index:string]: string | boolean | null}>({
        "type": null,
        "isPersonalize": false,
        "isPleasure": false,
    });

    //子コンポーネントに送るもの
    const loggedInContext: LoggedInContextInterface = {
        isLoggedIn: isLoggedIn,
        setLoggedIn: setIsLoggedIn,
    };
    const playListContext: PlayListContextInterface = {
        playList: playList,
        setPlayList: setPlayList,
        playListInfo: playListInfo,
        setPlayListInfo: setPlayListInfo,
    }

    useEffect(() => {
        (async () => {
            let res = await getUserInfo();
            if (!res) {
               const isRefresh = await refresh();
               if (isRefresh) {
                   setIsLoggedIn(isRefresh);
               }
            }
            setIsLoggedIn(res);
        })();
    }, []);


    return(
        <Box component={"div"}>
            <BrowserRouter>
                <LoggedInContext.Provider value={loggedInContext}>
                    <PlayListContext.Provider value={playListContext}>
                        <Header />
                        <Box sx={{marginTop: "100px", marginBottom: "250px"}}>
                            <Switch>
                                <Route exact path="/">
                                    <Home />
                                </Route>
                                <Route exact path="/login">
                                    <Login />
                                </Route>
                                <Route exact path={"/experiment"}>
                                    <Experiment />
                                </Route>
                                <Route path={"/experiment/detail/:exptInfo"}>
                                    <ExperimentDetail />
                                </Route>
                                <Route path={"/create-playlist"}>
                                    <SelectPlayList />
                                </Route>
                            </Switch>
                        </Box>
                        {isLoggedIn && (
                            <MusicPlayer />
                        )}
                    </PlayListContext.Provider>
                </LoggedInContext.Provider>
            </BrowserRouter>
        </Box>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
  document.getElementById('root')
);