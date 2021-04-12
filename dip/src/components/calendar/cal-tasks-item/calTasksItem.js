import React from 'react';
import {connect} from 'react-redux';
import WithRestoService from '../../hoc';
import styled from 'styled-components';

const CalTasksItemDiv = styled.div`
    width: calc(100% - 20px);
    border-radius: 10px;
    border: 1px solid rgba(226,232,255, .5);
    padding: 10px;
    margin: 10px;
    margin-right: 30px;

    :hover{
        cursor: pointer;
        background-color: #f1f4ff;
        box-shadow: 0 2px 8px rgb(143 175 255 / 50%);
    }
`

const TaskUp = styled.div`
    display: flex;
    width: 100%;
    padding: 10px;
    font-size: 17px;
    justify-content: space-between;
    font-weight: 600;
`

const TaskSubj = styled.div`
    color: #4056B9;
    margin-right: 10px;
`
const TaskDate = styled.div`
    color: #6675bb;
    text-align: end;
`


const TaskTitle = styled.div`
    color: #5B5B5B;
    font-size: 16px;
    font-weight: 600;
    padding: 10px;
    display: flex;
    width: 100%;
    justify-content: space-between;
`

const TitleText = styled.div`
    flex: 70%;
`
const TitleType = styled.div`
    font-size: 14px;
    opacity: 0.5;
    flex: 30%;
    text-align: end;
`

const TaskText = styled.div`
    color: #5B5B5B;
    font-weight: 400;
    width: 100%;
    padding: 10px;
`

class CalTasksItem extends React.Component{
    render(){

        const {subj, date, title, type, text} = this.props;

        return(
            <CalTasksItemDiv>
                <TaskUp>
                    <TaskSubj>{subj}</TaskSubj>
                    <TaskDate>{date}</TaskDate>
                </TaskUp>
                <TaskTitle>
                    <TitleText>{title}</TitleText>
                    <TitleType>{type}</TitleType>
                </TaskTitle>
                <TaskText>
                    {text}
                </TaskText>
            </CalTasksItemDiv>
        )
    }
}


export default CalTasksItem;