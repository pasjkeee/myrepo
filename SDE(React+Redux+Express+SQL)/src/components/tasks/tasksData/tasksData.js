import React from 'react';
import styled from 'styled-components';
import WithRestoService from '../../hoc';
import {connect} from 'react-redux';
import TasksTheme from '../taskTheme';

const TasksDataContainer = styled.div`

    background: linear-gradient( -45deg , white, #f3f6ff);
    width: 100%;
    min-height: 100vh;
`

class TasksData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render(){
        return(
            <TasksDataContainer>
                <TasksTheme subjId={this.props.subjId}></TasksTheme>
            </TasksDataContainer>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = {
};

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(TasksData));