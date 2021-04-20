import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {connect} from 'react-redux';
import WithRestoService from '../hoc';


import {chooseMode, addRow, delRow, addColumn, delColumn, editTable, removeStrongDomination, removeDom, randomRefilling} from '../../actions';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
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

// @ts-ignore
import OutTableRows from './outTableRows.tsx';

// @ts-ignore
import BtnGroup from './btnGroup.tsx';

import MyTable from './table';

interface IProps {
    rows: number,
    columns: number,
    table: [[[number, number]]],
    choosed: string,
    filters: {},
    addColumn(): {},
    delColumn(): {},
    addRow(): {},
    delRow(): {},
    randomRefilling(): {},
    chooseMode(e: string): {},
    editTable(a: number, b: number, edit1: number, edit2: number): {},
    removeStrongDomination(a: [number, string][]): {},
    removeDom(a: string): {},
    rowsStrategy: number[],
    columnsStrategy: number[]
}

interface IState {
    rows: number,
    columns: number,
    table: [[[number, number]]],
    choosed: string,
    rowsStrategy: number[],
    columnsStrategy: number[]
}

const App: React.FC<IProps> = (props: IProps) => {

    let [current, setCurrent] = useState<number[]>([0, 0]);
    let [editActive, setEditActive] = useState<boolean>(false);
    let [edit1, setEdit1] = useState<number>(0);
    let [edit2, setEdit2] = useState<number>(0);
    let [list, setList] = useState<string[]>([]);
    let [listStrongDomintaion, setListStrongDomintaion] = useState<Array<[number, string]>>([[-1,""]]); 
    let [listWeaklyDomintaion, setListWeaklyDomintaion] = useState<Array<[number, string]>>([[-1,""]]);
    let [MAXMINA, setMAXMINA] = useState<number[]>([]);
    let [MINMAXA, setMINMAXA] = useState<number[]>([]);
    let [MAXMINB, setMAXMINB] = useState<number[]>([]);
    let [MINMAXB, setMINMAXB] = useState<number[]>([]);
    let [rerenderTable, setRerenderTable] = useState<boolean>(false);

    
    let newListStrongDomintaionSet = useMemo(()=>new Set<[number, string]>(), []);
    let newListWeaklyDomintaionSet = useMemo(()=>new Set<[number, string]>(), []);

    const {rows, columns, table, choosed} = props;
    
    const changeCurrent = (i: number, j: number) => {
        setEditActive(true);
        setEdit1(props.table[i][j][0]);
        setEdit2(props.table[i][j][1]);
        setCurrent([i, j]);
    }

    const onClickEdit = () => {
        props.editTable(current[0],current[1], edit1, edit2);
        setEditActive(false);
    }

    const findDomination = useCallback((rows: number, columns: number, table: [[[number, number]]],index: number, list: string[], player: string, type: string) => {
        let countMin: number, countEq: number;
    
        let columnsSet = new Set<string>();
        let rowsSet = new Set<string>();

        let resList: string[] = [];
        let resListSet = new Set<string>();

        let newTable: [[number[]]] = [[[]]];

        if(player === "B" && choosed === "one"){
            for(let i=0; i<rows; i++){
                newTable[i] = [[]]; 
                for(let j=0; j<columns; j++){
                    newTable[i][j] = [];
                    newTable[i][j][index] = -table[i][j][index];
                }
            } 
        } else {
            newTable = [...table];
        }

        for(let i=0; i<((type === "rows") ? rows : columns); i++){
            for(let k=0; k<((type === "rows") ? rows : columns); k++){
                countMin = 0;
                countEq = 0;
                for(let j=0; j<((type === "rows") ? columns : rows);j++){
                    if(k!==i){
                        if(((type === "rows") ? (newTable[i][j][index] > newTable[k][j][index]) : (newTable[j][i][index] > newTable[j][k][index]))){
                            break;
                        } else if(((type === "rows") ? (newTable[i][j][index] === newTable[k][j][index]) : (newTable[j][i][index] === newTable[j][k][index]))){
                            countEq++;
                        } else {
                            countMin++;
                        }
                    }
                }
                
                if(countMin === ((type === "rows") ? columns : rows)){
                    resListSet.add(`${player}${(type === "rows") ? props.rowsStrategy[i] : props.columnsStrategy[i]} СИЛЬНО доминируемый относительно ${player}${(type === "rows") ? props.rowsStrategy[k] : props.columnsStrategy[k]}`);

                    let count: number = columnsSet.size;
                    columnsSet.add(`${i}${type}`);

                    if(count !== columnsSet.size){
                        newListStrongDomintaionSet.add([i, type]);
                    }
                } else if(countEq+countMin === ((type === "rows") ? columns : rows)){
                    resListSet.add(`${player}${(type === "rows") ? props.rowsStrategy[i] : props.columnsStrategy[i]} СЛАБО доминируемый относительно ${player}${(type === "rows") ? props.rowsStrategy[k] : props.columnsStrategy[k]}`);

                    let count: number = rowsSet.size;
                    rowsSet.add(`${i}${type}`);

                    if(count !== rowsSet.size){
                        newListWeaklyDomintaionSet.add([i, type]);
                    }
                }
            }
        }
        setListStrongDomintaion(Array.from(newListStrongDomintaionSet.values()));
        setListWeaklyDomintaion(Array.from(newListWeaklyDomintaionSet.values()));

        resList = Array.from(resListSet.values());
        return resList
    }, [newListStrongDomintaionSet, newListWeaklyDomintaionSet, props.columnsStrategy, props.rowsStrategy, choosed])

    const updDomination = useCallback(() => {
        let newList: string[] = [];
        
        if(choosed === "one"){
            newList = [...findDomination(rows, columns, props.table, 0, newList, "B", "rows")];
            newList = [...newList, ...findDomination(rows, columns, props.table, 0, newList, "A", "columns")];
        } else {
            newList = [...findDomination(rows, columns, props.table, 1, newList, "B", "rows")];
            newList = [...newList, ...findDomination(rows, columns, props.table, 0, newList, "A", "columns")];
        } 
        setList(newList);
    }, [choosed, rows, columns, findDomination, props.table])

    const findMinIndexRow = (rows: number, columns: number, table: [[[number, number]]], index: number): [number, number, number][] => {
        let minIndex: [number, number, number][] = [];
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

    const findMaxIndexRow = (rows: number, columns: number, table: [[[number, number]]], index: number): [number, number, number][] => {
        let maxIndex: [number, number, number][] = [];
        for(let i=0; i<rows;i++){
            let max = Number.MIN_SAFE_INTEGER;
            for(let j=0; j<columns;j++){
                if(+table[i][j][index] >= max) {
                    max = +table[i][j][index];
                }
            }
            for(let j=0; j<columns;j++){
                if(+table[i][j][0] === max) {
                    maxIndex.push([i, j, +table[i][j][index]]);
                }
            }
        }
        return maxIndex;
    }


    const findMaxIndexColumn = (rows: number, columns: number, table: [[[number, number]]], index: number): [number, number, number][] => {
        let maxIndex: [number, number, number][] = [];
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

    const findMinIndexColumn = (rows: number, columns: number, table: [[[number, number]]], index: number): [number, number, number][] => {
        let minIndex: [number, number, number][] = [];
        for(let i=0; i<columns;i++){
            let min = Number.MAX_SAFE_INTEGER;
            for(let j=0; j<rows;j++){
                if(+table[j][i][index] <= min) {
                    min = +table[j][i][index];
                }
            }
            for(let j=0; j<rows;j++){
                if(+table[j][i][index] === min) {
                    minIndex.push([j, i, +table[j][i][index]]);
                }
            }
        }
        return minIndex;
    }

    const findMINMAXIndex = (minIndex: [number, number, number][]): number[] => {
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

    const findMAXMINIndex = (maxIndex: [number, number, number][]): number[] => {
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

        if(choosed === "one"){

            let minIndexA = findMinIndexColumn(rows, columns, table, 0);
            let maxIndexA = findMaxIndexColumn(rows, columns, table, 0);
            let minIndexB = findMinIndexRow(rows, columns, table, 0);
            let maxIndexB = findMaxIndexRow(rows, columns, table, 0);
            let MINMAXIndexA = findMINMAXIndex(minIndexA);
            let MAXMINIndexA = findMAXMINIndex(maxIndexA);
            let MAXMINIndexB = findMINMAXIndex(minIndexB);
            let MINMAXIndexB = findMAXMINIndex(maxIndexB);
            
            setMINMAXA(MINMAXIndexA);
            setMAXMINA(MAXMINIndexA);
            setMINMAXB(MINMAXIndexB);
            setMAXMINB(MAXMINIndexB);
        }

        if(choosed === "two"){
            let minIndexA = findMinIndexColumn(rows, columns, table, 0);
            let maxIndexA = findMaxIndexColumn(rows, columns, table, 0);
            let minIndexB = findMinIndexRow(rows, columns, table, 1);
            let maxIndexB = findMaxIndexRow(rows, columns, table, 1);
            let MINMAXIndexA = findMINMAXIndex(minIndexA);
            let MAXMINIndexA = findMAXMINIndex(maxIndexA);
            let MAXMINIndexB = findMINMAXIndex(minIndexB);
            let MINMAXIndexB = findMAXMINIndex(maxIndexB);
            
            setMINMAXA(MINMAXIndexA);
            setMAXMINA(MAXMINIndexA);
            setMINMAXB(MINMAXIndexB);
            setMAXMINB(MAXMINIndexB);
        }
    }

    const delDomClick = (item: string) => {
       
        props.removeDom(item);
    }

    const rndRefill = () => {
        props.randomRefilling();
        const ren = rerenderTable;
        setRerenderTable(!ren);
        updDomination();
    }

    useEffect(()=>{
        updDomination();
    },[props.table, updDomination, edit1, edit2, current]);

    const editFuildStyle: React.CSSProperties = {
        backgroundColor: "white", 
        width: "120px", 
        marginRight: "20px"
    }

    const tableContainerStyle: React.CSSProperties = {
        maxWidth: "1000px", 
        position: "relative",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        margin: "100px"
    }
    const editContainer: React.CSSProperties = {
        position: "absolute",
        left: "0px",
        top: "0px",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.8)"
    }
    const container: React.CSSProperties = {
        position: "relative", 
        margin: "100px 0px 100px 100px",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start"
    }

    const selectContainer: React.CSSProperties = {
        display: "flex", 
        flexDirection: "column",
        width: "300px",
        marginLeft: "100px"
    }


    const edit = editActive && (
        <div style={editContainer}>
            <TextField autoFocus id="filled-basic1" label="Change field" variant="filled" style={editFuildStyle} value={edit1}
                        onChange={(e)=>setEdit1(+e.target.value)}/>

            {(choosed === "two") ? (
            <TextField  id="filled-basic2" label="Change field" variant="filled" style={editFuildStyle} value={edit2}
                onChange={(e)=>setEdit2(+e.target.value)}/>) : false}

            <ButtonGroup orientation="vertical" color="primary" aria-label="vertical outlined primary button group">
                <Button style={{backgroundColor: "white"}} onClick={()=>{onClickEdit()}}>Edit</Button>
                <Button style={{backgroundColor: "white"}} onClick={()=>{setEditActive(false)}}>Cancel</Button>
            </ButtonGroup>
        </div>);

    return(
        <>
            <div style={container} data-prop={props.table}>
                <MyTable table={props.table} choosed={props.choosed} edit={edit} changeCurrent={changeCurrent} rowsStrategy={props.rowsStrategy} columnsStrategy={props.columnsStrategy}/>
                
                <div style={selectContainer}>
                    <FormControl component="fieldset" style={{margin: "20px 0px 0px 20px"}}>
                        <FormLabel component="legend">Режим ввода</FormLabel>
                        <RadioGroup aria-label="gender" name="mode" value={choosed} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{props.chooseMode(event.target.value)}}>
                            <FormControlLabel value="one" control={<Radio />} label="По одному числу" />
                            <FormControlLabel value="two" control={<Radio />} label="По двум числам" />
                        </RadioGroup>
                    </FormControl>
                    <BtnGroup addMethod={props.addColumn} delMethod={props.delColumn} textAdd="Добавить столбец" textDel="Убрать столбец"/>
                    <BtnGroup addMethod={props.addRow} delMethod={props.delRow} textAdd="Добавить строку" textDel="Убрать строку"/>
                    <Button  variant="contained" color="secondary" onClick={()=>{updDomination()}} >Upd domination</Button>
                    <Button  variant="contained" color="primary" onClick={()=>{setMINMAX()}} >Upd MAXMIN/MINMAX</Button>
                    <Button  variant="contained" color="secondary" onClick={()=>{rndRefill()}} >RANDOM REFILL</Button>
                    <Button  variant="contained" color="primary" onClick={()=>{props.removeStrongDomination(listStrongDomintaion)}} disabled>Удалить сильно доминируемые стратегии</Button>  
                    <Button  variant="contained" color="secondary" onClick={()=>{props.removeStrongDomination(listWeaklyDomintaion)}} disabled>Удалить слабо доминируемые стратегии</Button>  
                    </div>
            </div>
            <TableContainer component={Paper} style={tableContainerStyle}>
                <Table size="small" aria-label="a dense table">
                    <TableBody>
                        {
                            list.map((item) => <TableRow key={item}><TableCell key="item">
                                {item}
                                <Button onClick={()=>{delDomClick(item)}}>Удалить</Button>
                                </TableCell></TableRow>)
                        }
                        <OutTableRows textRow="MINMAX A Строка: " textColumn="MINMAX A Столбец " textValue="MINMAX A Занчение" data={MINMAXA}/>
                        <OutTableRows textRow="MAXMIN А Строка: " textColumn="MAXMIN А Столбец " textValue="MAXMIN А Занчение" data={MAXMINA}/>
                        <OutTableRows textRow="MINMAX B Строка: " textColumn="MINMAX B Столбец " textValue="MINMAX B Занчение" data={MINMAXB}/>
                        <OutTableRows textRow="MAXMIN B Строка: " textColumn="MAXMIN B Столбец " textValue="MAXMIN B Занчение" data={MAXMINB}/>
                    </TableBody>
                </Table>
            </TableContainer>
        </> 
    )
}

const mapStateToProps = (state: IState) => {
    return {
        table: state.table,
        choosed: state.choosed,
        rows: state.rows,
        columns: state.columns,
        rowsStrategy: state.rowsStrategy,
        columnsStrategy: state.columnsStrategy
    }
}

const mapDispatchToProps = {
    chooseMode,
    addRow,
    delRow,
    addColumn,
    delColumn,
    editTable,
    removeStrongDomination,
    removeDom,
    randomRefilling
};


export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(App));
