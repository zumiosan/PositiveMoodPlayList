import React from "react";
import {useParams} from "react-router-dom";

export default function ExperimentDetail() {
    const { exptId } = useParams<{exptId: string}>();

    return (
        <div>
            Experiment: {exptId}
        </div>
    )
}