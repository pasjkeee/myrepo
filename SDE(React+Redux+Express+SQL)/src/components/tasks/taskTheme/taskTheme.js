import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import {connect} from 'react-redux';
import RadioCustom from '../radioCustom';
import ThemeContent from '../themeContent';

import {getTaskThemeData} from '../../../actions'

import ThemeBtns from '../theme-btns';


const DataFilter = styled.div`
    width: 100%;
    height: 60px;
    border-bottom: 1px solid rgba(125, 159, 244, 0.1);
    display: flex;
    justify-content: center;
    background-color: rgba(125, 159, 244, 0.05);

    form{
        display: flex;
        align-items: center;
        margin-left: 30px;

        label{
            margin-right: 20px;
            display: flex;
            align-items: center;
            font-size: 18px;
            cursor: pointer;
            font-weight: 300;

            input{
                margin-right: 7px;
                display: none;
            }
        }
    }
`


const TasksTheme  = (props) => {

    let [dropdownOpen, setDropdownOpen] = useState(false);
    let [toggle, setToggle] = useState(false);
    let [currentFiletr, setCurrentFiletr] = useState("all");
    let [enabled, setEnabled] = useState([true, false, false, false, false]);
    let [data, setData] = useState([]);

    useEffect(()=>{
        props.getTaskThemeData(props.subjId.courseId);
    },[])

    useEffect(()=>{
        setData(props.taskThemeData)
    },[props.taskThemeData])

    const changeFilter = (e) => {
        let currentNum = [false, false, false, false, false];
        if(e.target.name){

            switch(e.target.name){
                case 'lection':
                    currentNum[1] = true;
                    break;
                case 'test':
                    currentNum[2] = true;
                    break;
                case 'presentation':
                    currentNum[3] = true;
                    break;
                case 'video':
                    currentNum[4] = true;
                    break;
                default: 
                    currentNum[0] = true;
                    break;
            }

            setCurrentFiletr(e.target.name);
            setEnabled(currentNum);
        }
    }

    console.log(props.taskThemeData);

    if(!props.taskThemeMounted || data.length === 0){
        return <></>
    }

    let newSet = new Set();
    let newObj = {};
    for(let i=0; i<data.length; i++){
        if(!newSet.has(data[i].theme_id)){
            newSet.add(data[i].theme_id)
            newObj[`${data[i].theme_id}`] = [];
        }
        newObj[`${data[i].theme_id}`].push(data[i]);
    }
    newSet = [...newSet];

    return(
        <>   
            <DataFilter>
                <form>
                    <label onClick={(e)=>{changeFilter(e)}}>
                        <RadioCustom color="#ABAEB3" enabled={enabled[0]}/>
                         <input name="all" type="radio" /> Все
                    </label>
                    <label onClick={(e)=>{changeFilter(e)}}>
                        <RadioCustom color="#FEB83C" enabled={enabled[1]}/>
                        <input name="lection" type="radio" /> Лекции
                    </label>
                    <label onClick={(e)=>{changeFilter(e)}}>
                        <RadioCustom color="#28D65D" enabled={enabled[2]}/>
                        <input name="test" type="radio" /> Тесты
                    </label>
                    <label onClick={(e)=>{changeFilter(e)}}>
                        <RadioCustom color="#BF58E6" enabled={enabled[3]}/>
                        <input name="presentation" type="radio" /> Презентации
                    </label>
                    <label onClick={(e)=>{changeFilter(e)}}>
                        <RadioCustom color="#D40000" enabled={enabled[4]}/>
                        <input name="video" type="radio" /> Видеo
                    </label>
                </form>
            </DataFilter>
            {
                newSet.map(item => {
                    return <ThemeContent key={item} data={newObj[item]} filter={currentFiletr}/>
                })
            }
            <ThemeBtns/>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        taskThemeData: state.taskTheme.taskThemeData,
        taskThemeMounted: state.taskTheme.taskThemeMounted
    }
}

const mapDispatchToProps = {
    getTaskThemeData
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksTheme);