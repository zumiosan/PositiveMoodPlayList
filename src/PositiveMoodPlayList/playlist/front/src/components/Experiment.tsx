import React, {useContext, useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from "@mui/material/Grid";
import {getExperimentInfo} from "./modules/apiExperiment";
import {refresh} from "./modules/apiJwt";
import {LoggedInContext} from "../index";

export default function Experiment() {

    const history = useHistory();

    const loginContext = useContext(LoggedInContext)!;
    const [setIsLoggIn] = [loginContext.setLoggedIn];

    // 実験情報データ
    const [exptList, setExptList] = useState<{[index: string]: number | boolean}[]>();

    useEffect(() => {
        (async () => {
            try {
                const res = await getExperimentInfo();
                setExptList(res)
            } catch (e: any) {
                const isRefresh = await refresh();
                if (isRefresh) {
                    const res = await getExperimentInfo();
                    setExptList(res)
                } else {
                    setIsLoggIn(isRefresh);
                    history.push('/login');
                }
            }
        })();
    }, [])


    return (
        <Grid container alignItems={"center"} justifyContent={"center"}>
            <Grid item xs={10}>
                <TableContainer component={Paper}>
                    <Table
                        size="small"
                        aria-label="a dense table"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell align={"center"}>実験番号</TableCell>
                                <TableCell align={"center"}>完了状態</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {exptList != undefined && (
                                exptList.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell align={"center"}>
                                            <Link to={"/experiment/detail/" + String(row.ex_id) }>
                                                {row.ex_id}
                                            </Link>
                                        </TableCell>
                                        <TableCell align="center">
                                            {row.is_finished ? (
                                                "完了"
                                            ) : (
                                                "未完"
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}