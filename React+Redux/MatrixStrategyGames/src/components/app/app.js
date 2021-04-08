import React, {useState} from 'react';
import {connect} from 'react-redux';
import WithRestoService from '../hoc';

import styled from 'styled-components';

import {chooseMode, addRow, delRow, addColumn, delColumn, editTable} from '../../actions';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import OutTableRows from './outTableRows';
import BtnGroup from './btnGroup';

const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 100px;

    .select-container{
        display: flex;
        flex-direction: column;
    }
`

const EditContainer = styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.8);
`


const App = (props) => {

    let [current, setCurrent] = useState([0, 0]);
    let [editActive, setEditActive] = useState(false);
    let [edit1, setEdit1] = useState("");
    let [edit2, setEdit2] = useState("");
    let [list, setList] = useState([]);
    let [MAXMINA, setMAXMINA] = useState([]);
    let [MINMAXA, setMINMAXA] = useState([]);
    let [MAXMINB, setMAXMINB] = useState([]);
    let [MINMAXB, setMINMAXB] = useState([]);

    const {rows, columns, table, choosed} = props;
    
    const changeCurrent = (i, j) => {
        setEditActive(true);
        setEdit1(props.table[i][j][0]);
        setEdit2(props.table[i][j][1]);
        setCurrent([i, j]);
    }

    const onClickEdit = () => {
        props.editTable(current[0],current[1], edit1, edit2);
        setEditActive(false);
    }

    const findDomination = (rows, columns, table, index, list, player, type) => {
        let countMin = 0, countEq = 0;
        let resList = [...list];
        for(let i=0; i<((type === "rows") ? rows : columns);i++){
            for(let k=0; k<((type === "rows") ? rows : columns);k++){
                countMin = 0;
                countEq = 0;
                for(let j=0; j<((type === "rows") ? columns : rows);j++){
                    if(k!==i){
                        if(((type === "rows") ? (table[i][j][index] > table[k][j][index]) : (table[j][i][index] > table[j][k][index]))){
                            break;
                        } else if(((type === "rows") ? (table[i][j][index] === table[k][j][index]) : (table[j][i][index] === table[j][k][index]))){
                            countEq++;
                        } else {
                            countMin++;
                        }
                    }
                }
                
                if(countMin === ((type === "rows") ? columns : rows)){
                    resList.push(`${player}${i} СИЛЬНО доминируемый относительно ${player}${k}`);
                } else if(countEq+countMin === ((type === "rows") ? columns : rows)){
                    resList.push(`${player}${i} СЛАБО доминируемый относительно ${player}${k}`);
                }
            }
        }

        return resList
    }

    const updDomination = () => {
        let newList = [];
        console.log(choosed);
        
        if(choosed === "one"){
            newList = [...newList, ...findDomination(rows, columns, table, 0, newList, "B", "rows")];
            newList = [...newList, ...findDomination(rows, columns, table, 0, newList, "A", "columns")];
        } else {
            newList = [...newList, ...findDomination(rows, columns, table, 1, newList, "B", "rows")];
            newList = [...newList, ...findDomination(rows, columns, table, 0, newList, "A", "columns")];
        } 
        setList(newList);
    }

    const findMinIndex = (rows, columns, table, index) => {
        let minIndex = [];
        for(let i=0; i<rows;i++){
            let min = Number.MAX_SAFE_INTEGER;
            for(let j=0; j<columns;j++){
                if(+table[i][j][index] <= min) {
                    min = +table[i][j][index];
                }
            }
            for(let j=0; j<columns;j++){
                if(+table[i][j][0] === min) {
                    minIndex.push([i, j, +table[i][j][index]]);
                }
            }
        }
        return minIndex;
    }

    const findMaxIndex = (rows, columns, table, index) => {
        let maxIndex = [];
        for(let i=0; i<columns;i++){
            let max = Number.MIN_SAFE_INTEGER;
            for(let j=0; j<rows;j++){
                if(+table[j][i][index] >= max) {
                    max = +table[j][i][index];
                }
            }
            for(let j=0; j<rows;j++){
                if(+table[j][i][index] === max) {
                    maxIndex.push([j, i, +table[j][i][index]]);
                }
            }
        }
        return maxIndex;
    }

    const findMINMAXIndex = (minIndex) => {
        let max = Number.MIN_SAFE_INTEGER;
        let newMINMAXIndex = [];

            for(let i=0; i<minIndex.length;i++){
                if(minIndex[i][2] > max){
                    max = minIndex[i][2]
                }
            }
            for(let i=0; i<minIndex.length;i++){
                if(minIndex[i][2] === max){
                    newMINMAXIndex.push(minIndex[i][0], minIndex[i][1], minIndex[i][2]); 
                }
            }
        return newMINMAXIndex;
    }

    const findMAXMINIndex = (maxIndex) => {
        let min = Number.MAX_SAFE_INTEGER;
        let newMAXMINIndex = [];

        for(let i=0; i<maxIndex.length;i++){
            if(maxIndex[i][2] <= min){
                min = maxIndex[i][2]
            }
        }
        for(let i=0; i<maxIndex.length;i++){
            if(maxIndex[i][2] === min){
                newMAXMINIndex.push(maxIndex[i][0], maxIndex[i][1], maxIndex[i][2]); 
            }
        }
        return newMAXMINIndex;
    }

    const setMINMAX = () => {

            let minIndexA = findMinIndex(rows, columns, table, 0);
            let MINMAXIndexA = findMINMAXIndex(minIndexA);

            let maxIndexA = findMaxIndex(rows, columns, table, 0);
            let MAXMINIndexA = findMAXMINIndex(maxIndexA);
            
            setMINMAXA(MINMAXIndexA);
            setMAXMINA(MAXMINIndexA);

            if(choosed === "two"){
                let minIndexB = findMinIndex(rows, columns, table, 1);
                let MINMAXIndexB = findMINMAXIndex(minIndexB);

                let maxIndexB = findMaxIndex(rows, columns, table, 1);
                let MAXMINIndexB = findMAXMINIndex(maxIndexB);

                setMINMAXB(MINMAXIndexB);
                setMAXMINB(MAXMINIndexB);
            }

            
    }

    const labelFor = (props.choosed === "one") ? "for 1 number" : "for 2 number (A/B)";

    const editFuildStyle = {
        backgroundColor: "white", 
        width: "120px", 
        marginRight: "20px"
    }

    const tableContainerStyle = {
        maxWidth: "1000px", 
        position: "relative", 
        margin: "100px"
    }


    const edit = editActive && (
        <EditContainer>
            <TextField id="filled-basic1" label="Change field" variant="filled" style={editFuildStyle} value={edit1}
                        onChange={(e)=>setEdit1(+e.target.value)}/>

            {(choosed === "two") ? (
            <TextField  id="filled-basic2" label="Change field" variant="filled" style={editFuildStyle} value={edit2}
                onChange={(e)=>setEdit2(+e.target.value)}/>) : false}

            <ButtonGroup orientation="vertical" color="primary" aria-label="vertical outlined primary button group">
                <Button style={{backgroundColor: "white"}} onClick={()=>{onClickEdit()}}>Edit</Button>
                <Button style={{backgroundColor: "white"}} onClick={()=>{setEditActive(false)}}>Cancel</Button>
            </ButtonGroup>
        </EditContainer>);

    return(
        <>
            <Container>
                <TableContainer component={Paper} style={tableContainerStyle}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">{labelFor}</TableCell>
                                {table[0].map((item, i) => <TableCell key={i} align="center">A{i}</TableCell> )}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                table.map((items, i) => {
                                    let com = <TableCell component="th" scope="row">B{i}</TableCell >
                                    let com2 = items.map((row, j) => <TableCell style={{cursor: "pointer"}} onClick={(e)=>{changeCurrent(i, j)}} key={j} align="center">
                                                                        {
                                                                            (choosed === "one") ? row[0] : `${row[0]} / ${row[1]}`
                                                                        }
                                                                    </TableCell>)
                                    return <TableRow key={i}>{com}{com2}</TableRow>
                                })
                            }
                        </TableBody>
                    </Table>
                    {edit}
                </TableContainer>
                <div className="select-container">
                    <FormControl component="fieldset" style={{margin: "20px 0px 0px 20px"}}>
                        <FormLabel component="legend">Режим ввода</FormLabel>
                        <RadioGroup aria-label="gender" name="mode" value={choosed} onChange={(event)=>{props.chooseMode(event.target.value)}}>
                            <FormControlLabel value="one" control={<Radio />} label="По одному числу" />
                            <FormControlLabel value="two" control={<Radio />} label="По двум числам" />
                        </RadioGroup>
                    </FormControl>
                    <BtnGroup addMethod={props.addColumn} delMethod={props.delColumn} textAdd="Добавить столбец" textDel="Убрать столбец"/>
                    <BtnGroup addMethod={props.addRow} delMethod={props.delRow} textAdd="Добавить строку" textDel="Убрать строку"/>
                            
                    <Button  variant="contained" color="secondary" onClick={()=>{updDomination()}} >Upd domination</Button>
                    <Button  variant="contained" color="primary" onClick={()=>{setMINMAX()}} >Upd MAXMIN/MINMAX</Button>
                </div> 
            </Container>
            <TableContainer component={Paper} style={tableContainerStyle}>
                <Table size="small" aria-label="a dense table">
                    <TableBody>
                        {
                            list.map((item) => <TableRow key={item}><TableCell key="item">{item}</TableCell></TableRow>)
                        }
                        <OutTableRows textRow="MINMAX A Строка: " textColumn="MINMAX A Столбец " textValue="MINMAX A Занчение" data={MINMAXA}/>
                        <OutTableRows textRow="MAXMIN A Строка: " textColumn="MAXMIN A Столбец " textValue="MAXMIN A Занчение" data={MAXMINA}/>
                        {
                            (choosed === "two") ? (
                                <OutTableRows textRow="MINMAX B Строка: " textColumn="MINMAX B Столбец " textValue="MINMAX B Занчение" data={MINMAXB}/>
                            ) : false
                        }

                        {
                            (choosed === "two") ? (
                                <OutTableRows textRow="MAXMIN B Строка: " textColumn="MAXMIN B Столбец " textValue="MAXMIN B Занчение" data={MAXMINB}/>
                            ) : false
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </> 
    )
}

const mapStateToProps = (state) => {
    return {
        table: state.table,
        choosed: state.choosed,
        rows: state.rows,
        columns: state.columns
    }
}

const mapDispatchToProps = {
    chooseMode,
    addRow,
    delRow,
    addColumn,
    delColumn,
    editTable
};


export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(App));
