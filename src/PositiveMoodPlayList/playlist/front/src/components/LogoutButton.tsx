import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import {apiURL, LoggedInContext} from "../index";
import { useHistory } from "react-router-dom";
import axios from "axios";


export default function LogoutButton() {
    const history = useHistory();

    const loggedInContext = useContext(LoggedInContext)!;
    const [setIsLoggedIn] = [loggedInContext.setLoggedIn];

    const handleLogout = async () => {
        const res = await axios.get(
            `${apiURL}account/logout/`,
            { withCredentials: true }
        );
        setIsLoggedIn(false);
        history.push("/");
    }

    return (
        <Button color="inherit" onClick={handleLogout}>Logout</Button>
    );
}