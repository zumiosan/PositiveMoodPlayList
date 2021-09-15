import React from 'react';
import ReactDOM from 'react-dom';
import {Switch, Route, BrowserRouter, Link} from "react-router-dom";
import Login from "./components/Login";

export const apiURL = 'http://localhost:8000/';

export default function App() {
    return(
        <BrowserRouter>
            <nav>
                <ul>
                    <li>
                        <Link to='/home'>Home</Link>
                    </li>
                    <li>
                        <Link to='/login'>Login</Link>
                    </li>
                </ul>
            </nav>
            <Switch>
                <Route path="/index">

                </Route>
                <Route path="/login">
                    <Login />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
  document.getElementById('root')
);