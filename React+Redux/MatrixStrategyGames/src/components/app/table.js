import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

 const MyTable = (props) => {

    const labelFor = (props.choosed === "one") ? "for 1 number" : "for 2 number (A/B)";

    const tableContainerStyle = {
        maxWidth: "1000px", 
        position: "relative",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        margin: "100px"
    }


    return(
        <TableContainer component={Paper} style={tableContainerStyle}>
            <Table size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">{labelFor}</TableCell>
                        {props.table[0].map((item, i) => <TableCell key={i} align="center">A{props.columnsStrategy[i]}</TableCell> )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        props.table.map((items, i) => {
                            let com = <TableCell component="th" scope="row">B{props.rowsStrategy[i]}</TableCell >
                            let com2 = items.map((row, j) => <TableCell style={{cursor: "pointer", minWidth: "70px"}} onClick={()=>{props.changeCurrent(i, j)}} key={Math.random()} align="center">
                                                                {
                                                                    (props.choosed === "one") ? row[0] : `${row[0]} / ${row[1]}`
                                                                }
                                                            </TableCell>)
                            return <TableRow key={i}>{com}{com2}</TableRow>
                        })
                    }
                </TableBody>
            </Table>
            {props.edit}
        </TableContainer>
    )
}

export default MyTable;