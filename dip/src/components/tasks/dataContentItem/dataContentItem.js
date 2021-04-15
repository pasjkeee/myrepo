import React from 'react';
import styled from 'styled-components';

import Flag from '../flag';
import TypeCircle from '../typeCircle';
import TaskBtns from '../task-btns';

const DataContentItemContainer = styled.div`

    width: 230px;
    min-height: 300px; 
    border: 1px solid #CBCBCB;
    background-color: #FFFFFF;
    border-radius: 8px;
    padding: 15px 15px 60px 15px;
    margin-top: 10px;
    position: relative;
    box-shadow: 1px 1px 4px rgba(203, 203, 203, 0.7);

    .dataHeader{
        width: 100%;
        display: flex;
        color: black;
        font-size: 18px;
        border-bottom: 1px solid #FAFAFA;
        font-weight: 500;

        .subjectName{
            color: #BFBFBF;
            font-size: 12px;
            font-weight: 300;
        }

        .dataHeaderTitle{
           padding: 0px 0px 10px 10px;
        }
    }

    .dataDescription{
        padding: 10px 0px;
        color: #8E8E8E;
        
    }

    .dateContainer{
        position: absolute;
        width: 100%;
        bottom: 0px;
        left: 0px;
        height: 60px;
        background-color: #F7F7F7;
        border-radius: 0px 0px 8px 8px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #9C9C9C;
        border-top: 1px solid #EBEBEB;
    }

    .blur-container{
        display: none;
    }

    :hover{
        .dataHeader, .dataDescription, .dateContainer{
            filter: blur(2px);
        }

        
        .blur-container{
            display: block;
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0px;
            top: 0px;
        }
    }

    
`

const DataContentItem = (props) => {

    const {date, end_date, task, subject, description, task_type} = props.data;

    if(props.filter === "all"){
        return(
            <>
                <DataContentItemContainer>
                    <div className="dataHeader"> 
                        <TypeCircle type={task_type}/>
                        <div className="dataHeaderTitle">
                            {task}
                            <div className="subjectName">
                                {subject}
                            </div>
                        </div>
                    </div>
                    <div className="dataDescription">
                        {description}
                    </div>
                    <div className="dateContainer">
                        <div className="fromDate">
                            <span>C</span> {date}
                        </div>
                        <div className="toDate">
                            <span>До</span> {end_date}
                        </div>
                    </div>
                    <Flag type={task_type}/>
                    <div className="blur-container">
                        <TaskBtns type="edit" className="not-blur"/>
                    </div>
                </DataContentItemContainer>
            </>
        )
    }

    if(props.filter === task_type){
        return(
            <>
                <DataContentItemContainer>
                    <div className="dataHeader"> 
                        <TypeCircle type={task_type}/>
                        <div className="dataHeaderTitle">
                            {task}
                            <div className="subjectName">
                                {subject}
                            </div>
                        </div>
                    </div>
                    <div className="dataDescription">
                        {description}
                    </div>
                    <div className="dateContainer">
                        <div className="fromDate">
                            <span>C</span> {date}
                        </div>
                        <div className="toDate">
                            <span>До</span> {end_date}
                        </div>
                    </div>
                    <Flag type={task_type}/>
                </DataContentItemContainer>
            </>
        )
    }
    return false;
}

export default DataContentItem;