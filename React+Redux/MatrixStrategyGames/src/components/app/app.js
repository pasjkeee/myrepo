import React from 'react';
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
    margin: 100px 100px;

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


class App extends React.Component{


    constructor( props ){
        super( props );
        this.state = {
            current: [],
            editActive: false,
            edit1: "",
            edit2: "",
            list: [],
            MAXMINA: [],
            MINMAXA: [],
            MAXMINB: [],
            MINMAXB: []
        }
        this.changeCurrent = this.changeCurrent.bind(this);
        this.closeEdit= this.closeEdit.bind(this);
        this.changeEdit1 = this.changeEdit1.bind(this);
        this.changeEdit2 = this.changeEdit2.bind(this);
        this.onClickEdit = this.onClickEdit.bind(this);
        this.updDomination = this.updDomination.bind(this);
        this.findMinIndex = this.findMinIndex.bind(this);
        this.findMaxIndex = this.findMaxIndex.bind(this);
        this.setMINMAX = this.setMINMAX.bind(this);
        this.findMAXMINIndex = this.findMAXMINIndex.bind(this);
        this.findMINMAXIndex = this.findMINMAXIndex.bind(this);
        
      }
    
    changeCurrent(i, j){
        this.setState({
            editActive: true,
            edit1: this.props.table[i][j][0],
            edit2: this.props.table[i][j][1],
            current: [i, j]
        })
    }

    changeEdit1(e){
        this.setState({
            edit1: +e.target.value
        });
        console.log(e.target.value)
    }

    changeEdit2(e){
        this.setState({
            edit2: +e.target.value
        });
        console.log(e.target.value)
    }

    closeEdit(){
        this.setState({
            editActive: false
        })
    }

    onClickEdit(){
        const {current, edit1, edit2 } = this.state;
        this.props.editTable(current[0],current[1], edit1, edit2);
        this.setState({
            editActive: false
        })
    }

    findDomination(rows, columns, table, index, list, player, type){
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
                console.log(countMin, countEq, columns, rows);
                if(countMin === ((type === "rows") ? columns : rows)){
                    resList.push(`${player}${i} СИЛЬНО доминируемый относительно ${player}${k}`);
                } else if(countEq+countMin === ((type === "rows") ? columns : rows)){
                    resList.push(`${player}${i} СЛАБО доминируемый относительно ${player}${k}`);
                }
            }
        }

        return resList
    }

    updDomination(){
        let list = [];
        const {rows, columns, table} = this.props;
        
        if(this.props.choosed === "one"){
            list = [...list, ...this.findDomination(rows, columns, table, 0, list, "B", "rows")];
            list = [...list, ...this.findDomination(rows, columns, table, 0, list, "A", "columns")];
        } else {
            list = [...list, ...this.findDomination(rows, columns, table, 1, list, "B", "rows")];
            list = [...list, ...this.findDomination(rows, columns, table, 0, list, "A", "columns")];
        } 
        this.setState({
            list: list
        })
    }

    findMinIndex(rows, columns, table, index){
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
        console.log(minIndex)
        return minIndex
    }

    findMaxIndex(rows, columns, table, index){
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
            console.log(maxIndex)
        }
        return maxIndex
    }

    findMINMAXIndex(minIndex){
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
                console.log(newMINMAXIndex);
        return newMINMAXIndex;
    }

    findMAXMINIndex(maxIndex){
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
        console.log(newMAXMINIndex);
        return newMAXMINIndex;
    }

    setMINMAX(){

        const {rows, columns, table} = this.props;

        if(this.props.choosed === "one"){
            let minIndex = this.findMinIndex(rows, columns, table, 0);
            let MINMAXIndex = this.findMINMAXIndex(minIndex);

            let maxIndex = this.findMaxIndex(rows, columns, table, 0);
            let MAXMINIndex = this.findMAXMINIndex(maxIndex);
            
            this.setState({
                MINMAXA: MINMAXIndex,
                MAXMINA: MAXMINIndex
            })

        } else {

            let minIndexA = this.findMinIndex(rows, columns, table, 0);
            let MINMAXIndexA = this.findMINMAXIndex(minIndexA, );

            let maxIndexA = this.findMaxIndex(rows, columns, table, 0);
            let MAXMINIndexA = this.findMAXMINIndex(maxIndexA);

            let minIndexB = this.findMinIndex(rows, columns, table, 1);
            let MINMAXIndexB = this.findMINMAXIndex(minIndexB);

            let maxIndexB = this.findMaxIndex(rows, columns, table, 1);
            let MAXMINIndexB = this.findMAXMINIndex(maxIndexB);
           

            this.setState({
                MINMAXA: MINMAXIndexA,
                MAXMINA: MAXMINIndexA,
                MINMAXB: MINMAXIndexB,
                MAXMINB: MAXMINIndexB
            })
        }
    }


    render(){

        const labelFor = (this.props.choosed === "one") ? "for 1 number" : "for 2 number (A/B)";

        const editFuildStyle = {
            backgroundColor: "white", 
            width: "120px", 
            marginRight: "20px"
        }

        const edit = (this.state.editActive === true) ? (
            <EditContainer>
                <TextField id="filled-basic1" label="Change field" variant="filled" style={editFuildStyle} value={this.state.edit1}
                            onChange={(e)=>this.changeEdit1(e)}/>

                {(this.props.choosed === "two") ? (
                <TextField  id="filled-basic2" label="Change field" variant="filled" style={editFuildStyle} value={this.state.edit2}
                    onChange={(e)=>this.changeEdit2(e)}/>) : false}

                <ButtonGroup orientation="vertical" color="primary" aria-label="vertical outlined primary button group">
                    <Button style={{backgroundColor: "white"}} onClick={()=>{this.onClickEdit()}}>Edit</Button>
                    <Button style={{backgroundColor: "white"}} onClick={()=>{this.closeEdit()}}>Cancel</Button>
                </ButtonGroup>
            </EditContainer>) : false;

        return(
        <>
            <Container>
                <TableContainer component={Paper} style={{maxWidth: "1000px", position: "relative", marginRight: "20px"}}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">{labelFor}</TableCell>
                                {this.props.table[0].map((item, i) => <TableCell key={i} align="center">A{i}</TableCell> )}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.props.table.map((items, i) => {
                                    let com = <TableCell component="th" scope="row">B{i}</TableCell >
                                    let com2 = items.map((row, j) => <TableCell style={{cursor: "pointer"}} onClick={(e)=>{this.changeCurrent(i, j)}} key={j} align="center">
                                                                        {
                                                                            (this.props.choosed === "one") ? row[0] : `${row[0]} / ${row[1]}`
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
                        <RadioGroup aria-label="gender" name="mode" value={this.props.choosed} onChange={(event)=>{this.props.chooseMode(event.target.value)}}>
                            <FormControlLabel value="one" control={<Radio />} label="По одному числу" />
                            <FormControlLabel value="two" control={<Radio />} label="По двум числам" />
                        </RadioGroup>
                    </FormControl>
                    <BtnGroup addMethod={this.props.addColumn} delMethod={this.props.delColumn} textAdd="Добавить столбец" textDel="Убрать столбец"/>
                    <BtnGroup addMethod={this.props.addRow} delMethod={this.props.delRow} textAdd="Добавить строку" textDel="Убрать строку"/>
                            
                    <Button  variant="contained" color="secondary" onClick={()=>{this.updDomination()}} >Upd domination</Button>
                    <Button  variant="contained" color="primary" onClick={()=>{this.setMINMAX()}} >Upd MAXMIN/MINMAX</Button>
                </div> 
            </Container>
            <TableContainer component={Paper} style={{maxWidth: "1000px", position: "relative", marginLeft: "100px"}}>
                <Table size="small" aria-label="a dense table">
                    <TableBody>
                        {
                            this.state.list.map((item) => <TableRow key={item}><TableCell key="item">{item}</TableCell></TableRow>)
                        }
                        <OutTableRows textRow="MINMAX A Строка: " textColumn="MINMAX A Столбец " textValue="MINMAX A Занчение" data={this.state.MINMAXA}/>
                        <OutTableRows textRow="MAXMIN A Строка: " textColumn="MAXMIN A Столбец " textValue="MAXMIN A Занчение" data={this.state.MAXMINA}/>
                        {
                            (this.props.choosed === "two") ? (
                                <OutTableRows textRow="MINMAX B Строка: " textColumn="MINMAX B Столбец " textValue="MINMAX B Занчение" data={this.state.MINMAXB}/>
                            ) : false
                        }

                        {
                            (this.props.choosed === "two") ? (
                                <OutTableRows textRow="MAXMIN B Строка: " textColumn="MAXMIN B Столбец " textValue="MAXMIN B Занчение" data={this.state.MAXMINB}/>
                            ) : false
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </> 
        )
    }
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
