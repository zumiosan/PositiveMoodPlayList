import React, { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
import { apiURL } from "../index"
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Cookies from "universal-cookie";

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

    // Cookie
    const [accessToken, setAccessToken] = useCookies(["accesstoken"]);
    const [refreshToken, setRefreshToken] = useCookies(["refreshtoken"]);
    const cookies = new Cookies();

    useEffect(() => {
        (async () => {
            // const res = await fetch(
            //     `${apiURL}playlist/exinfo/`,
            //     {
            //         method: "GET",
            //         credentials: "same-origin"
            //     }
            // )
            const res = await axios.get(
                `${apiURL}playlist/exinfo/`,
                { withCredentials: true }
            )
            console.log(res);
        })();
    }, [])


    return (
        <Grid container alignItems={"center"} justifyContent={"center"}>
          <Grid item>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>実験番号</TableCell>
                      <TableCell>完了状態</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
            </TableContainer>
          </Grid>
        </Grid>

    );
}