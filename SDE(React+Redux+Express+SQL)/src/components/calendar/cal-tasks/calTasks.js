import React from 'react';
import {connect} from 'react-redux';
import WithRestoService from '../../hoc';
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
`


class CalTasks extends React.Component{
    render(){
        return(
            <CalTasksDiv>
                {
                    this.props.date.map(objItem => {
                        return (
                            <CalTasksItem key={objItem.id}
                            subj={objItem.subj}
                            date={objItem.date}
                            title={objItem.title}
                            type={objItem.type}
                            text={objItem.text}
                            />
                        )
                    })
                }
                
            </CalTasksDiv>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        
    }
}

const mapDispatchToProps = {
    
};


export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(CalTasks));