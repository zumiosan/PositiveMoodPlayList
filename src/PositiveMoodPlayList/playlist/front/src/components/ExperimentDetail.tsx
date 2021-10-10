import React, { Fragment, useState, useContext, useRef } from "react";
import {useParams, Link, useHistory} from "react-router-dom";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {completeExperiment} from "./modules/apiExperiment";
import Grid from "@mui/material/Grid";
import {LoggedInContext, PlayListContext} from "../index";
import { createExperimentPlaylist } from "./modules/apiExperiment";
import {refresh} from "./modules/apiJwt";
import {createPlayList} from "./modules/apiPlayList";

const steps = ['実験前アンケート', 'プレイリストの聴取', '実験後アンケート'];

export default function ExperimentDetail() {

    const history = useHistory();

    const [activeStep, setActiveStep] = useState<number>(0);

    const { exptInfo } = useParams<{exptInfo: string}>();

    const playListMid = useRef<number[]>([]);

    const loginContext = useContext(LoggedInContext)!;
    const [setIsLoggIn] = [loginContext.setLoggedIn];

    const playListContext = useContext(PlayListContext)!;
    const [setPlayList, setPlayListInfo] = [playListContext.setPlayList, playListContext.setPlayListInfo];


    const handleNext = async () => {
        if (activeStep === 0) {
            const data = {
                ex_id: exptInfo,
            }
            const playlistInfo = {
                "type": null,
                "isPersonalize": false,
                "isPleasure": false,
            };
            try {
                const res = await createExperimentPlaylist(data);
                for (let i = 0; i < res.length; i++) {
                    playListMid.current.push(res[i]['mid'] as number);
                }
                setPlayList(res);
                setPlayListInfo(playlistInfo);
            } catch (e: any) {
                const isRefresh = await refresh();
                if (isRefresh) {
                    const res = await createExperimentPlaylist(data);
                    for (let i = 0; i < res.length; i++) {
                        playListMid.current.push(res[i]['mid'] as number);
                    }
                    setPlayList(res);
                    setPlayListInfo(playlistInfo);
                } else {
                    setIsLoggIn(isRefresh);
                    history.push('/login');
                }
            }
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleComplete = async () => {
        const data = {
            "ex_id": exptInfo,
            "is_finished": true,
            "playlist_mid": playListMid.current,
        }
        try {
            const res = await completeExperiment(data);
        } catch (e:any) {
            const isRefresh = await refresh();
            if (isRefresh) {
                const res = await completeExperiment(data);
            } else {
                setIsLoggIn(isRefresh);
                history.push('/login');
            }
        }
        await handleNext();
    }

    return (
        <Grid container alignItems={"center"} justifyContent={"center"} spacing={4}>
            <Grid item xs={10}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label, index) => {
                        const stepProps: { completed?: boolean } = {};
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            </Grid>
            {activeStep === steps.length ? (
                <Fragment>
                    <Grid item container xs={10} alignItems={"center"} justifyContent={"center"}>
                         <Grid item xs={12}>
                            <Typography variant={"body1"} align={"center"}>
                                実験完了
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item container xs={10} alignItems={"center"} justifyContent={"center"} spacing={4}>
                        <Grid item>
                            <Button
                              color="inherit"
                              onClick={handleBack}
                            >
                              Back
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button>
                                <Link to={"/experiment"}>
                                    Top Page
                                </Link>
                            </Button>
                        </Grid>
                    </Grid>
                </Fragment>
            ) : activeStep === 2 ? (
                <Fragment>
                    <Grid item container xs={10} alignItems={"center"} justifyContent={"center"}>
                        <Grid item xs={12}>
                            <Typography variant={"body1"} align={"center"}>
                                このリンク先の実験後アンケートに回答してください．
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item container xs={10} alignItems={"center"} justifyContent={"center"} spacing={4}>
                        <Grid item>
                            <Button
                              color="inherit"
                              onClick={handleBack}
                            >
                              Back
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={handleComplete}>
                                Next
                            </Button>
                        </Grid>
                    </Grid>
                </Fragment>
            ) : activeStep === 1 ? (
                <Fragment>
                    <Grid item container xs={10} alignItems={"center"} justifyContent={"center"}>
                        <Grid item xs={12}>
                            <Typography variant={"body1"} align={"center"}>
                                プレイリストを再生して聴取してください．
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item container xs={10} alignItems={"center"} justifyContent={"center"} spacing={4}>
                        <Grid item>
                            <Button
                              color="inherit"
                              onClick={handleBack}
                            >
                              Back
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={handleNext}>
                                Next
                            </Button>
                        </Grid>
                    </Grid>
                </Fragment>
            ) : activeStep === 0 && (
                <Fragment>
                    <Grid item container xs={10} alignItems={"center"} justifyContent={"center"}>
                        <Grid item xs={12}>
                            <Typography variant={"body1"} align={"center"}>
                                このリンク先の実験前アンケートに回答してください．
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item container xs={10} alignItems={"center"} justifyContent={"center"} spacing={4}>
                        <Grid item>
                            <Button
                              color="inherit"
                              disabled
                            >
                              Back
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={handleNext}>
                                Next
                            </Button>
                        </Grid>
                    </Grid>
                </Fragment>
            )}
        </Grid>
    )
}