import React, {Fragment, ReactNode, useRef, useState} from "react";
import {useParams, Link} from "react-router-dom";
import Box from '@material-ui/core/Box';
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {completeExperiment} from "./modules/apiExperiment";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";

const steps = ['実験前アンケート', 'プレイリストの聴取', '実験後アンケート']

const useStyles = makeStyles( {
    stepper: {
        justifyItems: "center"
    }
})

export default function ExperimentDetail() {
    const [activeStep, setActiveStep] = useState<number>(0);
    const playListMid = useRef<number[]>([]);
    const { exptInfo } = useParams<{exptInfo: string}>();
    const classes = useStyles()

    const handleNext = async () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        // if (activeStep === 1) {
        //     playListMid.current = await
        // }
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