import React, {Fragment, useState, useContext} from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import {FormControlLabel} from "@mui/material";
import Grid from "@mui/material/Grid";
import {playlistImage, impressionTransition} from "./modules/playlistInfo";
import {PlayListContext} from "../index";
import {createPlayList, CreatePlayListInterface, createRandomPlayList} from "./modules/apiPlayList";

type Props = {
    pattern: string,
}

export const PlayListCard: React.FC<Props> = ({pattern}) => {

    const [isPersonalize, setIsPersonalize] = useState(false);

    const [isPleasure, setIsPleasure] = useState(false);

    const playlistContext = useContext(PlayListContext)!;
    const [setPlaylist] = [playlistContext.setPlayList];

    const handleCreate = async () => {
        const data: CreatePlayListInterface = {
            up_down_info: impressionTransition[pattern]["up_down_info"] as number[],
            transition: impressionTransition[pattern]["transition"] as string[],
            is_personalize: isPersonalize,
            is_pleasure: isPleasure,
        }

        try {
            const playlist = await createPlayList(data);
            setPlaylist(playlist);
        } catch (e: any) {

        }

    };

    const handleRandom = async () => {
        try {
            const playlist = await createRandomPlayList();
            setPlaylist(playlist);
        } catch (e: any) {

        }
    }

    const handlePersonalize = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsPersonalize(event.target.checked);
    };

    const handlePleasure = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsPleasure(event.target.checked);
    };


    return (
        <Fragment>
            <Card sx={{ minWidth: "90%"}}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {pattern}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Grid container spacing={2}>
                        {pattern != "Random" ? (
                            <Fragment>
                                <Grid item container xs={12} spacing={2} justifyContent={"center"} alignItems={"center"}>
                                    <FormControlLabel
                                        control={<Checkbox checked={isPersonalize} onChange={handlePersonalize}/>}
                                        label={"Personalize"}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={isPleasure} onChange={handlePleasure}/>}
                                        label={"Pleasure"}
                                    />
                                </Grid>
                                <Grid item container xs={12} justifyContent={"flex-end"} alignItems={"center"}>
                                    <Button size="small" onClick={handleCreate}>CreatePlayList</Button>
                                </Grid>
                            </Fragment>
                        ):(
                            <Grid item container xs={12} justifyContent={"flex-end"} alignItems={"flex-end"}>
                                <Button size="small" onClick={handleRandom}>CreatePlayList</Button>
                            </Grid>
                        )}
                    </Grid>
                </CardActions>
            </Card>
        </Fragment>
    )
}