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

const steps = ['実験前アンケート', 'プレイリストの聴取', '実験後アンケート']


export default function ExperimentDetail() {
    const [activeStep, setActiveStep] = useState<number>(0);
    const playListMid = useRef<number[]>([]);
    const { exptInfo } = useParams<{exptInfo: string}>();

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
        <Grid container alignItems={"center"} justifyContent={"center"}>
            <Grid item xs={8}>
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
                {activeStep === steps.length ? (
                    <Fragment>
                        <Typography variant={"body1"}>
                            実験完了
                        </Typography>
                        <Box sx={{display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button
                              color="inherit"
                              onClick={handleBack}
                            >
                              Back
                            </Button>
                            <Button>
                                <Link to={"/experiment"}>
                                    To Top Page
                                </Link>
                            </Button>
                        </Box>
                    </Fragment>
                ) : activeStep === 2 ? (
                    <Fragment>
                        <Typography variant={"body1"}>
                            このリンク先の実験後アンケートに回答してください．
                        </Typography>
                        <Box sx={{display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button
                              color="inherit"
                              onClick={handleBack}
                            >
                              Back
                            </Button>
                            <Button onClick={handleComplete}>
                                Next
                            </Button>
                        </Box>
                    </Fragment>
                ) : activeStep === 1 ? (
                    <Fragment>
                        <Typography variant={"body1"}>
                            プレイリストを再生して聴取してください．
                        </Typography>
                        <Box sx={{display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button
                              color="inherit"
                              onClick={handleBack}
                            >
                              Back
                            </Button>
                            <Button onClick={handleNext}>
                                Next
                            </Button>
                        </Box>
                    </Fragment>
                ) : activeStep === 0 && (
                    <Fragment>
                        <Typography variant={"body1"}>
                            このリンク先の実験前アンケートに回答してください．
                        </Typography>
                        <Box sx={{display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button
                              color="inherit"
                              disabled
                            >
                              Back
                            </Button>
                            <Button onClick={handleNext}>
                                Next
                            </Button>
                        </Box>
                    </Fragment>
                )}
            </Grid>
        </Grid>
    )
}