import React, {Fragment} from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";


export default function SelectPlayList() {

    const playlistPattern = [
        "盛り上げる_パターン1",
        "盛り上げる_パターン2",
        "盛り上げる_パターン3",
        "盛り上げる_パターン4",
        "落ち着ける_パターン1",
        "落ち着ける_パターン2",
        "落ち着ける_パターン3",
        "落ち着ける_パターン4",
        "ランダム"
    ]

    const playlistImage = {
        "盛り上げる_パターン1": "/asset/up_p1.png",
        "盛り上げる_パターン2": "/asset/up_p2.png",
        "盛り上げる_パターン3": "/asset/up_p3.png",
        "盛り上げる_パターン4": "/asset/up_p4.png",
        "落ち着ける_パターン1": "/asset/down_p1.png",
        "落ち着ける_パターン2": "/asset/down_p2.png",
        "落ち着ける_パターン3": "/asset/down_p3.png",
        "落ち着ける_パターン4": "/asset/down_p4.png",
        "ランダム": "/asset/random.png"
    }

    return(
        <Fragment>
            <Grid container spacing={3}>
                {playlistPattern.map((value) => (
                    <Grid item container justifyContent={"center"} xs={12} sm={4} key={value}>
                        <Card sx={{ minWidth: 345 , maxWidth: 345}}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {value}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">CreatePlayList</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Fragment>
    );
}