import React from 'react';
import styled from 'styled-components';
import CalTasksItem from '../cal-tasks-item';


const CalTasksDiv = styled.div`
    margin: 100px 30px;
    border-radius: 10px;
    border: 1px solid rgba(226,232,255, .9);
    min-height: 30px;
    width: calc(100% - 650px);
    max-height: 80%;
    overflow: auto;
    position: relative;

    ::-webkit-scrollbar-button {
        background-image:url('');
        background-repeat:no-repeat;
        width: 20px;
        height:0px;
        }
        
        ::-webkit-scrollbar-track {
        background-color:#FFFFFF;
        box-shadow:0px 0px 2px #4056B9 inset;
        }
        
        ::-webkit-scrollbar-thumb {
        -webkit-border-radius: 3px;
        border-radius: 3px;
        background-color: #7D9FF4;
        box-shadow:0px 1px 1px #fff inset;
        background-image:url('https://yraaa.ru/_pu/24/59610063.png');
        background-position:center;
        background-repeat:no-repeat;
        }
        
        ::-webkit-resizer{
        background-image:url('');
        background-repeat:no-repeat;
        width:10px;
        height:0px;
        }
        
        ::-webkit-scrollbar{
        width: 11px;
        }
`


const CalTasks = (props) => {
    return(
        <CalTasksDiv>
            {
                props.date.map(objItem => {
                    return (
                        <CalTasksItem
                        key={objItem.task_id}
                                    subj={objItem.subject}
                                    subjId={objItem.subject_id}
                                    date={objItem.date}
                                    title={objItem.task}
                                    type={objItem.task_type}
                                    text={objItem.description}
                                    taskId={objItem.task_id}
                        />
                    )
                })
            }
            
        </CalTasksDiv>
    )
}

// const mapDispatchToProps = {
//     setSelectedId,
//     removeSelectedId
// }
export default CalTasks;
//export default connect(null, mapDispatchToProps)(CalTasks);
