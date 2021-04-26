import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import WithRestoService from '../../hoc';
import styled from 'styled-components';
import CalSpan from '../cal-span';
//0px 0px 1px rgba(125, 159, 244, 0.5);

const CalContainerTable = styled.table`
    position: relative;
    border-spacing: 0;

    th{
        color: #7D9FF4;
        font-size: 1.5rem;
        font-weight: 600;
        padding: 10px 0px;
        box-shadow: inset 0px 0px 2px rgba(125, 159, 244, 0.1);
    }
    td{
        width: 80px;
        height: 80px;
        box-shadow: inset 2px 2px 3px rgba(125, 159, 244, 0.1),
            inset -2px -2px 3px #ffffff;
        position: relative;
        z-index: 5;
    }
    
    tr td{
        font-size: 1.5rem;
        font-weight: 600;
        text-align: center;
        color: #4056B9;
        position: relative;
        cursor: pointer;
    }
    
    tr td:hover{
        font-size: 1.75rem;
    }
    
`


const CalContainerItem = (props) => {
    //Массив чисел в контейнере дней
    let [days, setDays] = useState([]);
    //Массив окрашивания
    let [datas, setDatas] = useState([[]]);

    let [ready, setReady] = useState(false);

    useEffect(()=>{
        //Парсинг строк дат в массив чисел
        const datas = props.obj.map(data => {
            const subjId = data.subject_id;
            const taskId = data.task_id;
            const date = data.date.split('.');
            const endDate = data.end_date.split('.');
            date[0] = +date[0]; date[1] = +date[1]; endDate[0] = +endDate[0]; endDate[1] = +endDate[1];
            return{
                subjId,
                taskId,
                date,
                endDate
            }
        });
            //Текущий день
        const nowYear = props.envYear,
            //Текущий месяц
              nowMonth = props.envMonth,
            //День начала месяца 
              nowStartDay = new Date(nowYear, nowMonth, 1),
            //День в неделе начала месяца
              nowStartDayNum = nowStartDay.getDay() === 0 ? 7 : nowStartDay.getDay();
            
        //Массив чисел в контейнере дней
        let days = [],
        //Массив окрашивания
            datasArr = [];

        //Кол-во дней в месяце
        function findNumOfDay(){
            const monthWith31Day = [0, 4, 6, 7, 9, 11];
            const monthWith30Day = [2, 3, 5, 8, 10];
            let n;
            if(monthWith31Day.includes(nowMonth)){
                n = 31;
            } else if(monthWith30Day.includes(nowMonth)){
                n = 30;
            } else if(nowYear%4 === 0){
                n = 29;
            } else {
                n = 28;
            }
            return n;
        }
        
        let nPrev;
        const n = findNumOfDay();
        if(n === 30){
            nPrev = 31;
        } else if(nowMonth === 0 || nowMonth === 7) {
            nPrev = 31;
        } else if(nowYear%4 === 0 && nowMonth === 2) {
            nPrev = 29;
        } else if(nowMonth === 2) {
            nPrev = 28;
        }else {
            nPrev = 30;
        }

        function write(d) {
            let daynum = d-1; 
            if(d===0) { daynum = 6; }
        
            let kCount = 1;

            //Плато состоит 7x7
            //Дни предыдущего месяца на плато
            for(let i = 0; i<daynum; i++){
                days[i] =  nPrev-daynum + kCount;
                datasArr[i] = [];
                datasArr[i][0] = false;
                for(let item of datas){
                    if(+nowMonth === +item.date[1] && +nowMonth+1 === +item.endDate[1]){
                        if(days[i] >= item.date[0]){
                            datasArr[i][0] = true;
                            datasArr[i].push([item.subjId, item.taskId]);
                        }
                    }
                    if(+nowMonth === +item.date[1] && +nowMonth === +item.endDate[1]){
                        if(days[i] >= item.date[0] && days[i] <= item.endDate[0]){
                            datasArr[i][0] = true;
                            datasArr[i].push([item.subjId, item.taskId]);
                        }
                    }
                }
                kCount++;
            }

            //Дни текущего месяца на плато
            //Массив из строк для выделения
            for(let i = 0; i < n; i++){
                days[daynum] = i+1+"";
                datasArr[daynum] = [];
                datasArr[daynum][0] = false
                for(let item of datas){
                    if(+nowMonth === +item.date[1] && +nowMonth+1 === +item.endDate[1]){
                        if(+days[daynum] <= item.endDate[0]){
                            datasArr[daynum][0] = true;
                            datasArr[daynum].push([item.subjId, item.taskId]);
                        }
                    }

                    if(+nowMonth+1 === +item.date[1] && +nowMonth+2 === item.endDate[1]){
                        if(days[daynum] >= item.date[0]){
                            datasArr[daynum][0] = true;
                            datasArr[daynum].push([item.subjId, item.taskId]);
                        }
                    } 

                    if(+nowMonth+1 === +item.date[1] && +nowMonth+1 === +item.endDate[1]){
                        if(days[daynum] >= item.date[0] && days[daynum] <= item.endDate[0]){
                            datasArr[daynum][0] = true;
                            datasArr[daynum].push([item.subjId, item.taskId]);
                        }
                    } 
                }
                daynum++;
            }

            let dig = 1;

            //Дни следующего месяца на плато
            for(let i = daynum; i<42; i++){
                days[i] = dig;
                datasArr[i] = [];
                datasArr[i][0] = false;
                for(let item of datas){
                    if(+nowMonth+1 === +item.date[1] && +nowMonth+2 === +item.endDate[1]){
                        if(+days[i] <= item.endDate[0] ){
                            datasArr[i][0] = true;
                            datasArr[i].push([item.subjId, item.taskId]);
                        }
                    }

                    if(+nowMonth+2 === +item.date[1] && +nowMonth+2 === +item.endDate[1]){
                        if(+days[i] >= item.date[0] && +days[i] <= item.endDate[0] ){
                            datasArr[i][0] = true;
                            datasArr[i].push([item.subjId, item.taskId]);
                        }
                    }
                }
                dig++;
            }
        }
        
        write(+nowStartDayNum);

        setDays(days);
        setDatas(datasArr)
        setReady(true);
    },[props.month, props.envDay, props.mounted, props.envMonth, props.envYear, props.obj]);

    return(
        <CalContainerTable>
            <tbody>
                <tr className="weekday"><th>ПН</th><th>ВТ</th><th>СР</th><th>ЧТ</th><th>ПТ</th><th>СБ</th><th>ВС</th></tr>
                <tr>
                    <td><CalSpan text={days[0]} colored={datas[0]} ready={ready}/></td>
                    <td><CalSpan text={days[1]} colored={datas[1]} ready={ready}/></td>
                    <td><CalSpan text={days[2]} colored={datas[2]} ready={ready}/></td>
                    <td><CalSpan text={days[3]} colored={datas[3]} ready={ready}/></td>
                    <td><CalSpan text={days[4]} colored={datas[4]} ready={ready}/></td>
                    <td><CalSpan text={days[5]} colored={datas[5]} ready={ready}/></td>
                    <td><CalSpan text={days[6]} colored={datas[6]} ready={ready}/></td>
                </tr>
                <tr>
                    <td><CalSpan text={days[7]} colored={datas[7]} ready={ready}/></td>
                    <td><CalSpan text={days[8]} colored={datas[8]} ready={ready}/></td>
                    <td><CalSpan text={days[9]} colored={datas[9]} ready={ready}/></td>
                    <td><CalSpan text={days[10]} colored={datas[10]} ready={ready}/></td>
                    <td><CalSpan text={days[11]} colored={datas[11]} ready={ready}/></td>
                    <td><CalSpan text={days[12]} colored={datas[12]} ready={ready}/></td>
                    <td><CalSpan text={days[13]} colored={datas[13]} ready={ready}/></td>
                </tr>
                <tr>
                    <td><CalSpan text={days[14]} colored={datas[14]} ready={ready}/></td>
                    <td><CalSpan text={days[15]} colored={datas[15]} ready={ready}/></td>
                    <td><CalSpan text={days[16]} colored={datas[16]} ready={ready}/></td>
                    <td><CalSpan text={days[17]} colored={datas[17]} ready={ready}/></td>
                    <td><CalSpan text={days[18]} colored={datas[18]} ready={ready}/></td>
                    <td><CalSpan text={days[19]} colored={datas[19]} ready={ready}/></td>
                    <td><CalSpan text={days[20]} colored={datas[20]} ready={ready}/></td>
                </tr>
                <tr><td><CalSpan text={days[21]} colored={datas[21]} ready={ready}/></td>
                    <td><CalSpan text={days[22]} colored={datas[22]} ready={ready}/></td>
                    <td><CalSpan text={days[23]} colored={datas[23]} ready={ready}/></td>
                    <td><CalSpan text={days[24]} colored={datas[24]} ready={ready}/></td>
                    <td><CalSpan text={days[25]} colored={datas[25]} ready={ready}/></td>
                    <td><CalSpan text={days[26]} colored={datas[26]} ready={ready}/></td>
                    <td><CalSpan text={days[27]} colored={datas[27]} ready={ready}/></td>
                </tr>
                <tr>
                    <td><CalSpan text={days[28]} colored={datas[28]} ready={ready}/></td>
                    <td><CalSpan text={days[29]} colored={datas[29]} ready={ready}/></td>
                    <td><CalSpan text={days[30]} colored={datas[30]} ready={ready}/></td>
                    <td><CalSpan text={days[31]} colored={datas[31]} ready={ready}/></td>
                    <td><CalSpan text={days[32]} colored={datas[32]} ready={ready}/></td>
                    <td><CalSpan text={days[33]} colored={datas[33]} ready={ready}/></td>
                    <td><CalSpan text={days[34]} colored={datas[34]} ready={ready}/></td>
                </tr>
                <tr><td><CalSpan text={days[35]} colored={datas[35]} ready={ready}/></td>
                    <td><CalSpan text={days[36]} colored={datas[36]} ready={ready}/></td>
                    <td><CalSpan text={days[37]} colored={datas[37]} ready={ready}/></td>
                    <td><CalSpan text={days[38]} colored={datas[38]} ready={ready}/></td>
                    <td><CalSpan text={days[39]} colored={datas[39]} ready={ready}/></td>
                    <td><CalSpan text={days[40]} colored={datas[40]} ready={ready}/></td>
                    <td><CalSpan text={days[41]} colored={datas[41]} ready={ready}/></td>
                </tr>
            </tbody>   
        </CalContainerTable> 
    )
}

const mapStateToProps = (state) => {
    return {
        envYear: state.coursesPage.envYear,
        envMonth: state.coursesPage.envMonth,
        envDay: state.coursesPage.envDay,
        obj: state.coursesPage.obj,
        mounted: state.coursesPage.isMounted
    }
}

export default WithRestoService()(connect(mapStateToProps)(CalContainerItem));