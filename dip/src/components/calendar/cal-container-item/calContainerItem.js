import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import WithRestoService from '../../hoc';
import styled from 'styled-components';
import CalSpan from '../cal-span';

const CalContainerTable = styled.table`
    position: relative;
    border-spacing: 0;

    th{
        color: #7D9FF4;
        font-size: 1.5rem;
        font-weight: 600;
        padding: 10px 0px;
    }
    td{
        width: 80px;
        height: 80px;
        box-shadow: 0 1px rgba(125, 159, 244, 0.1);
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
    let [datas, setDatas] = useState([]);

    useEffect(()=>{
        //Парсинг строк дат в массив чисел
        const datas = props.obj.map(data => {
            const date = data.date.split('.');
            const endDate = data.end_date.split('.');
            date[0] = +date[0]; date[1] = +date[1]; endDate[0] = +endDate[0]; endDate[1] = +endDate[1];
            return{
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
                datasArr[i] = false;
                for(let item of datas){
                    if(+nowMonth === +item.date[1] && +nowMonth+1 === +item.endDate[1]){
                        if(days[i] >= item.date[0]){
                            datasArr[i] = true;
                        }
                    }
                    if(+nowMonth === +item.date[1] && +nowMonth === +item.endDate[1]){
                        if(days[i] >= item.date[0] && days[i] <= item.endDate[0]){
                            datasArr[i] = true;
                        }
                    }
                }
                kCount++;
            }

            //Дни текущего месяца на плато
            //Массив из строк для выделения
            for(let i = 0; i < n; i++){
                days[daynum] = i+1+"";
                datasArr[daynum] = false
                for(let item of datas){
                    if(+nowMonth === +item.date[1] && +nowMonth+1 === +item.endDate[1]){
                        if(+days[daynum] <= item.endDate[0]){
                            datasArr[daynum] = true;
                        }
                    }

                    if(+nowMonth+1 === +item.date[1] && +nowMonth+2 === item.endDate[1]){
                        if(days[daynum] >= item.date[0]){
                            datasArr[daynum] = true;
                        }
                    } 

                    if(+nowMonth+1 === +item.date[1] && +nowMonth+1 === +item.endDate[1]){
                        if(days[daynum] >= item.date[0] && days[daynum] <= item.endDate[0]){
                            datasArr[daynum] = true
                        }
                    } 
                }
                daynum++;
            }

            let dig = 1;

            //Дни следующего месяца на плато
            for(let i = daynum; i<42; i++){
                days[i] = dig;
                datasArr[i] = false;
                for(let item of datas){
                    if(+nowMonth+1 === +item.date[1] && +nowMonth+2 === +item.endDate[1]){
                        if(+days[i] <= item.endDate[0] ){
                            datasArr[i] = true;
                        }
                    }

                    if(+nowMonth+2 === +item.date[1] && +nowMonth+2 === +item.endDate[1]){
                        if(+days[i] >= item.date[0] && +days[i] <= item.endDate[0] ){
                            datasArr[i] = true;
                        }
                    }
                }
                dig++;
            }
        }
        
        write(+nowStartDayNum);

        setDays(days);
        setDatas(datasArr)
    },[props.month, props.mounted, props.envDay, props.envMonth, props.envYear, props.obj]);

    return(
        <CalContainerTable>
            <tbody>
                <tr className="weekday"><th>ПН</th><th>ВТ</th><th>СР</th><th>ЧТ</th><th>ПТ</th><th>СБ</th><th>ВС</th></tr>
                <tr>
                    <td><CalSpan text={days[0]} colored={datas[0]}/></td>
                    <td><CalSpan text={days[1]} colored={datas[1]}/></td>
                    <td><CalSpan text={days[2]} colored={datas[2]}/></td>
                    <td><CalSpan text={days[3]} colored={datas[3]}/></td>
                    <td><CalSpan text={days[4]} colored={datas[4]}/></td>
                    <td><CalSpan text={days[5]} colored={datas[5]}/></td>
                    <td><CalSpan text={days[6]} colored={datas[6]}/></td>
                </tr>
                <tr>
                    <td><CalSpan text={days[7]} colored={datas[7]}/></td>
                    <td><CalSpan text={days[8]} colored={datas[8]}/></td>
                    <td><CalSpan text={days[9]} colored={datas[9]}/></td>
                    <td><CalSpan text={days[10]} colored={datas[10]}/></td>
                    <td><CalSpan text={days[11]} colored={datas[11]}/></td>
                    <td><CalSpan text={days[12]} colored={datas[12]}/></td>
                    <td><CalSpan text={days[13]} colored={datas[13]}/></td>
                </tr>
                <tr>
                    <td><CalSpan text={days[14]} colored={datas[14]}/></td>
                    <td><CalSpan text={days[15]} colored={datas[15]}/></td>
                    <td><CalSpan text={days[16]} colored={datas[16]}/></td>
                    <td><CalSpan text={days[17]} colored={datas[17]}/></td>
                    <td><CalSpan text={days[18]} colored={datas[18]}/></td>
                    <td><CalSpan text={days[19]} colored={datas[19]}/></td>
                    <td><CalSpan text={days[20]} colored={datas[20]}/></td>
                </tr>
                <tr><td><CalSpan text={days[21]} colored={datas[21]}/></td>
                    <td><CalSpan text={days[22]} colored={datas[22]}/></td>
                    <td><CalSpan text={days[23]} colored={datas[23]}/></td>
                    <td><CalSpan text={days[24]} colored={datas[24]}/></td>
                    <td><CalSpan text={days[25]} colored={datas[25]}/></td>
                    <td><CalSpan text={days[26]} colored={datas[26]}/></td>
                    <td><CalSpan text={days[27]} colored={datas[27]}/></td>
                </tr>
                <tr>
                    <td><CalSpan text={days[28]} colored={datas[28]}/></td>
                    <td><CalSpan text={days[29]} colored={datas[29]}/></td>
                    <td><CalSpan text={days[30]} colored={datas[30]}/></td>
                    <td><CalSpan text={days[31]} colored={datas[31]}/></td>
                    <td><CalSpan text={days[32]} colored={datas[32]}/></td>
                    <td><CalSpan text={days[33]} colored={datas[33]}/></td>
                    <td><CalSpan text={days[34]} colored={datas[34]}/></td>
                </tr>
                <tr><td><CalSpan text={days[35]} colored={datas[35]}/></td>
                    <td><CalSpan text={days[36]} colored={datas[36]}/></td>
                    <td><CalSpan text={days[37]} colored={datas[37]}/></td>
                    <td><CalSpan text={days[38]} colored={datas[38]}/></td>
                    <td><CalSpan text={days[39]} colored={datas[39]}/></td>
                    <td><CalSpan text={days[40]} colored={datas[40]}/></td>
                    <td><CalSpan text={days[41]} colored={datas[41]}/></td>
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