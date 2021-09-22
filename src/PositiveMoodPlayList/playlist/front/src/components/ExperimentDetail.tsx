import React, { Fragment, useState, useContext, useRef } from "react";
import {useParams, Link} from "react-router-dom";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {completeExperiment} from "./modules/apiExperiment";
import Grid from "@material-ui/core/Grid";
import { PlayListContext } from "../index";
import { createPlayList, CreatePlayListInterface } from "./modules/apiPlayList";

const steps = ['実験前アンケート', 'プレイリストの聴取', '実験後アンケート'];

export default function ExperimentDetail() {
    const [activeStep, setActiveStep] = useState<number>(0);

    const { exptInfo } = useParams<{exptInfo: string}>();

    const playListMid = useRef<number[]>([]);

    const playListContext = useContext(PlayListContext)!;
    const [setPlayList] = [playListContext.setPlayList];


    const handleNext = async () => {
        if (activeStep === 0) {
            const data: CreatePlayListInterface = {
                transition: ["hh", "hh", "mh", "mh"],
                upDownInfo: [0, -1, -1, -1],
                isPersonalized: true,
            }
            playListMid.current = await createPlayList(data);
            console.log(playListMid.current);
            setPlayList(playListMid.current);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleComplete = async () => {
        const data = {
            "ex_id": exptInfo[0],
            "is_finished": true,
            "playlist_mid": playListMid.current,
            "playlist_type": exptInfo[1]
        }
        const res = await completeExperiment(data);
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