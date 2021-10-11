import React from "react";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";


export default function LoginButton() {
    const history = useHistory();

    const handleLogin = () => {
        history.push("/login");
    }

    return (
        <Button
            color="inherit"
            onClick={handleLogin}
        >
            Login
        </Button>
    );
}