import React from 'react';
import styled from 'styled-components';

import TasksTheme from '../taskTheme';

const TasksDataContainer = styled.div`

    background: linear-gradient( -45deg , white, #f3f6ff);
    width: 100%;
    min-height: 100vh;
`

const TasksData = (props) => {

    return(
        <TasksDataContainer>
            <TasksTheme subjId={props.subjId}></TasksTheme>
        </TasksDataContainer>
    )
}

export default TasksData;