import React, {Fragment} from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import {playlistPattern} from "./modules/playlistInfo";
import {PlayListCard} from "./PlayListCard";


export default function SelectPlayList() {

    return(
        <Fragment>
            <Grid container spacing={3}>
                {playlistPattern.map((value) => (
                    <Grid item container justifyContent={"center"} xs={12} sm={4} key={value}>
                        <PlayListCard pattern={value} />
                    </Grid>
                ))}
            </Grid>
        </Fragment>
    );
}