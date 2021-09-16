import React, { useContext } from "react";
import { useCookies } from "react-cookie";
import Button from "@material-ui/core/Button";
import { LoggedInContext } from "../index";
import { useHistory } from "react-router-dom";


export default function LogoutButton() {
    const history = useHistory();

    const loggedInContext = useContext(LoggedInContext)!;
    const [setIsLoggedIn] = [loggedInContext.setLoggedIn];

    const [cookie, setCookie, removeCookie] = useCookies();

    const handleLogout = () => {
        removeCookie("access");
        removeCookie("refresh");
        setIsLoggedIn(false);
        history.push("/");
    }

    return (
        <Button color="inherit" onClick={handleLogout}>Logout</Button>
    );
}