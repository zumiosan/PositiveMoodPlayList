import React, {useContext, createContext, useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {Switch, Route, BrowserRouter, Link} from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import Experiment from "./components/Experiment";
import ExperimentDetail from "./components/ExperimentDetail";
import {getUserInfo} from "./components/modules/apiJwt";

export const apiURL = 'http://localhost:8000/';

interface LoggedInContextInterface {
    isLoggedIn: boolean
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export const LoggedInContext = createContext<LoggedInContextInterface | null>(null)

export default function App() {

    //ログイン状態
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    //子コンポーネントに送るもの
    const loggedInContext: LoggedInContextInterface = {
        isLoggedIn: isLoggedIn,
        setLoggedIn: setIsLoggedIn
    };

    useEffect(() => {
        (async () => {
            const res = await getUserInfo();
            setIsLoggedIn(res);
        })();
    }, []);


    return(
        <div>
            <BrowserRouter>
                <LoggedInContext.Provider value={loggedInContext}>
                    <Header />
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
                </LoggedInContext.Provider>
            </BrowserRouter>
        </div>

    );
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
  document.getElementById('root')
);