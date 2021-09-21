import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import { getExperimentInfo } from "./modules/apiExperiment";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
];

export default function Experiment() {
    const classes = useStyles();

    // 実験情報データ
    const [exptList, setExptList] = useState<{[index: string]: number | boolean}[]>();

    useEffect(() => {
        (async () => {
            const res = await getExperimentInfo();
            setExptList(res)
        })();
    }, [])


    return (
        <Grid container alignItems={"center"} justifyContent={"center"}>
            <Grid item>
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
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
                                            <Link to={"/experiment/detail/" + String(row.ex_id) + String(row.playlist_type) }>
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