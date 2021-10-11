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
import {PlayListContext, LoggedInContext} from "../index";
import {createPlayList, CreatePlayListInterface, createRandomPlayList} from "./modules/apiPlayList";
import {refresh} from "./modules/apiJwt";
import {useHistory} from "react-router-dom";

type Props = {
    pattern: string,
}

export const PlayListCard: React.FC<Props> = ({pattern}) => {

    const history = useHistory();

    const [isPersonalize, setIsPersonalize] = useState(false);

    const [isPleasure, setIsPleasure] = useState(false);

    const loginContext = useContext(LoggedInContext)!;
    const [setIsLoggIn] = [loginContext.setLoggedIn];

    const playlistContext = useContext(PlayListContext)!;
    const [setPlaylist, setPlayListInfo] = [playlistContext.setPlayList, playlistContext.setPlayListInfo];

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
            handlePlayListInfo();
        } catch (e: any) {
            const isRefresh = await refresh();
            if (isRefresh) {
                const playlist = await createPlayList(data);
                setPlaylist(playlist);
                handlePlayListInfo();
            } else {
                setIsLoggIn(isRefresh);
                history.push('/login');
            }
        }
    };

    const handleRandom = async () => {
        try {
            const playlist = await createRandomPlayList();
            setPlaylist(playlist);
            handlePlayListInfo();
        } catch (e: any) {
            const isRefresh = await refresh();
            if (isRefresh) {
                const playlist = await createRandomPlayList();
                setPlaylist(playlist);
                handlePlayListInfo();
            } else {
                setIsLoggIn(isRefresh);
                history.push('/login');
            }
        }
    }

    const handlePlayListInfo = () => {
        const playlistInfo = {
                "type": pattern,
                "isPersonalize": isPersonalize,
                "isPleasure": isPleasure,
        }
        setPlayListInfo(playlistInfo);
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