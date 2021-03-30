import React from 'react';
import styled from 'styled-components';
import WithRestoService from '../hoc';
import {connect} from 'react-redux';
import TasksNavBar from './tasksNavBar';
import TasksData from './tasksData';

const Wrapper = styled.div`
    background: rgb(255,255,255);
    background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(148,187,233,1) 100%);
    padding-top: 100px;
`

const TasksContainer = styled.div`
    width: 1140px;
    margin: 0 auto;
    min-height: 100vh;
    background: linear-gradient( -45deg , white, #f3f6ff);
    border-radius: 20px 20px 0px 0px;

`

class Tasks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render(){
        return(
            <Wrapper>
                <TasksContainer>
                    <TasksNavBar></TasksNavBar>
                    <TasksData subjId={this.props.match.params}></TasksData>
                </TasksContainer>
            </Wrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = {
};

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(Tasks));