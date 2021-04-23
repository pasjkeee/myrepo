import React from 'react';
import styled from 'styled-components';

import TasksNavBar from './tasksNavBar';
import TasksData from './tasksData';

import TaskThemeModalAdd from './taskTehemeModals/taskThemeModalAdd';
import TaskThemeModalEdit from './taskTehemeModals/taskThemeModalEdit';
import TaskThemeModalDelete from './taskTehemeModals/taskThemeModalDelete';

const Wrapper = styled.div`
    background: linear-gradient( 45deg ,#FFFFFF,#E2E8FF);
    padding-top: 100px;
`

const TasksContainer = styled.div`
    width: 1140px;
    margin: 0 auto;
    min-height: 100vh;
    background: linear-gradient( -45deg , white, #f3f6ff);
    box-shadow: 0 2px 8px rgb(125 159 244 / 50%);
    border-radius: 20px 20px 0px 0px;

`

const Tasks = (props) => {

    return(
        <>
            <Wrapper>
                <TasksContainer>
                    <TasksNavBar></TasksNavBar>
                    <TasksData subjId={props.match.params}></TasksData>
                </TasksContainer>
            </Wrapper>
            <TaskThemeModalAdd/>
            <TaskThemeModalEdit/>
            <TaskThemeModalDelete/>
        </>
    )
}

export default Tasks;