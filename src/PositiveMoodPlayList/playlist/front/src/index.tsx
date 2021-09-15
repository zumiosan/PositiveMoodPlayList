import React from 'react';
import ReactDOM from 'react-dom';
import {Switch, Route, BrowserRouter, Link} from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";

export const apiURL = 'http://localhost:8000/';

export default function App() {
    return(
        <div>
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route exact path="/">

                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                </Switch>
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