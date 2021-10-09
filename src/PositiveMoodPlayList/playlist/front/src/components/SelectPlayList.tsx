import React, {Fragment} from "react";
import Grid from "@mui/material/Grid";
import {playlistPattern} from "./modules/playlistInfo";
import {PlayListCard} from "./PlayListCard";


export default function SelectPlayList() {

    return(
        <Fragment>
            <Grid container spacing={3}>
                {playlistPattern.map((value) => (
                    <Grid item container justifyContent={"center"} xs={12} sm={6} key={value}>
                        <PlayListCard pattern={value} />
                    </Grid>
                ))}
            </Grid>
        </Fragment>
    );
}