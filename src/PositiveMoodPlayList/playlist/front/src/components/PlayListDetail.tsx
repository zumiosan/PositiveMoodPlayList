import React, {Fragment, useContext} from 'react';
import {PlayListContext} from "../index";
import Grid from "@mui/material/Grid";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import MusicNoteIcon from '@mui/icons-material/MusicNote';

export default function PlayListDetail() {

    const playlistContext = useContext(PlayListContext)!;
    const [playlist] = [playlistContext.playList];
    const [playListIndex, setPlayListIndex] = [playlistContext.playListIndex, playlistContext.setPlayListIndex];

    const handlePlay = (index: number) => {
        setPlayListIndex(index);
    }

    return (
        <Grid container alignItems={"center"} justifyContent={"center"}>
            <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <Table
                        size="small"
                        aria-label="a dense table"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell align={"center"}>曲順</TableCell>
                                <TableCell align={"center"}>アーティスト</TableCell>
                                <TableCell align={"center"}>タイトル</TableCell>
                                <TableCell align={"center"}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {playlist.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell align={"center"}>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row["artist_name"]}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row["music_name"]}
                                    </TableCell>
                                    <TableCell align="center">
                                        {playListIndex == index ? (
                                            <MusicNoteIcon fontSize={"large"} />
                                        ) : (
                                            <Button onClick={() => handlePlay(index)}>
                                                Play
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}