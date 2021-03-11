import React from 'react';
import {connect} from 'react-redux';
import WithRestoService from '../hoc';
import styled from 'styled-components';

import CalContainer from './cal-container';
import CalTasks from './cal-tasks';


const Cal = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
    min-height: 800px;
    width: 1240px;
    font-family: 'Montserrat', sans-serif;
    position: absolute;
    z-index: 20;
    top: 0px;
    background: linear-gradient( -45deg, white, #f3f6ff);
    transition: transform 1s ease;
    transform: translate(-50%, 0%);
    left: 50%;
    box-shadow: 2px 2px 5px rgb(125 159 244 / 30%);
`

const CalWrapper = styled.div`
    width: 1140px;
    display: flex;
    justify-content: space-between;
    height: 100%;
`

const obj = [{
    subj: "Терия систем математического управления",
    date: "25.02.2021",
    endDate: "5.03.2021",
    title: "Реляционные базы данных",
    type: "Тест0",
    text: "В этом тесте мы увидим на сколько вы не знаете наш предмет и 100% будете его переписывать. Удачи.", 
    id: 0

},
{
    subj: "Терия систем математического управления",
    date: "17.02.2021",
    endDate: "22.02.2021",
    title: "Реляционные базы данных",
    type: "Тест1",
    text: "В этом тесте мы увидим на сколько вы не знаете наш предмет и 100% будете его переписывать. Удачи.", 
    id: 1 

},
{
    subj: "Терия систем математического управления",
    date: "11.02.2021",
    endDate: "11.02.2021",
    title: "Реляционные базы данных",
    type: "Тест2",
    text: "В этом тесте мы увидим на сколько вы не знаете наш предмет и 100% будете его переписывать. Удачи.",  
    id: 2

},
{
    subj: "Терия систем математического управления",
    date: "24.01.2021",
    endDate: "2.02.2021",
    title: "Реляционные базы данных",
    type: "Тест3",
    text: "В этом тесте мы увидим на сколько вы не знаете наш предмет и 100% будете его переписывать. Удачи.",  
    id: 3

},
{
    subj: "Терия систем математического управления",
    date: "14.04.2021",
    endDate: "19.04.2021",
    title: "Реляционные базы данных",
    type: "Тест3",
    text: "В этом тесте мы увидим на сколько вы не знаете наш предмет и 100% будете его переписывать. Удачи.",  
    id: 4

},
{
    subj: "Терия систем математического управления",
    date: "5.01.2021",
    endDate: "10.01.2021",
    title: "Реляционные базы данных",
    type: "Тест3",
    text: "В этом тесте мы увидим на сколько вы не знаете наш предмет и 100% будете его переписывать. Удачи.",  
    id: 5

}
]


class Calendar extends React.Component{

    render(){

        const datas = this.props.obj.map(data => {
            const date = data.date.split('.');
            const endDate = data.endDate.split('.');
            date[0] = +date[0]; date[1] = +date[1]; endDate[0] = +endDate[0]; endDate[1] = +endDate[1];
            return{
                date,
                endDate
            }
        });

        let calDisplay = {
            transform: ((this.props.calDisplay) ? "translate(-50%, 0%)" : "translate(-50%, -150%)")
        }

        return (
                <Cal style={calDisplay}>
                    <CalWrapper>
                        <CalTasks date={this.props.obj}></CalTasks>
                        <CalContainer date={datas}></CalContainer>
                    </CalWrapper>
                </Cal>
            )
    }

}


const mapStateToProps = (state) => {
    return {
        calDisplay: state.calDisplay,
        obj: state.obj
    }
}

const mapDispatchToProps = {
    
};


export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(Calendar));