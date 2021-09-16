import React, { useContext, createContext, useState } from 'react';
import ReactDOM from 'react-dom';
import {Switch, Route, BrowserRouter, Link} from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";

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


    return(
        <div>
            <BrowserRouter>
                <LoggedInContext.Provider value={loggedInContext}>
                    <Header />
                    <Switch>
                        <Route exact path="/">

                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path={"/experiment"}>

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