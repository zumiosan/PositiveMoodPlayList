import React, { useContext } from "react";
import Button from "@mui/material/Button";
import { LoggedInContext } from "../index";
import { useHistory } from "react-router-dom";
import { logout } from "./modules/apiJwt";


export default function LogoutButton() {
    const history = useHistory();

    const loggedInContext = useContext(LoggedInContext)!;
    const [setIsLoggedIn] = [loggedInContext.setLoggedIn];

    const handleLogout = async () => {
        const res = await logout();
        setIsLoggedIn(false);
        history.push("/");
    }

    return (
        <Button color="inherit" onClick={handleLogout}>Logout</Button>
    );
}