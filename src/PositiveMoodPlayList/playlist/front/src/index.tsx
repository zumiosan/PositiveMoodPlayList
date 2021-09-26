import React, { createContext, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {Switch, Route, BrowserRouter, Link} from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import Experiment from "./components/Experiment";
import ExperimentDetail from "./components/ExperimentDetail";
import {getUserInfo} from "./components/modules/apiJwt";
import MusicPlayer from "./components/MusicPlayer";
import Box from "@mui/material/Box";

export const apiURL = 'http://localhost:8000/';

interface PlayListContextInterface {
    playList: number[]
    setPlayList: React.Dispatch<React.SetStateAction<number[]>>
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
    const [playList, setPlayList] = useState<number[]>([]);

    //子コンポーネントに送るもの
    const loggedInContext: LoggedInContextInterface = {
        isLoggedIn: isLoggedIn,
        setLoggedIn: setIsLoggedIn,
    };
    const playListContext: PlayListContextInterface = {
        playList: playList,
        setPlayList: setPlayList,
    }

    useEffect(() => {
        (async () => {
            const res = await getUserInfo();
            setIsLoggedIn(res);
        })();
    }, []);


    return(
        <Box component={"div"}>
            <BrowserRouter>
                <LoggedInContext.Provider value={loggedInContext}>
                    <Header />
                    <PlayListContext.Provider value={playListContext}>
                        <Switch>
                            <Route exact path="/">

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
                        </Switch>
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