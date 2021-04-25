import React from 'react';
import styled from 'styled-components';

import {connect} from 'react-redux';

const TasksNavBarContainer = styled.div`
    width: 1140px;
    height: 160px;
    background-color: #7D9FF4;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 50px;
    border-radius: 20px 20px 0px 0px;
    text-shadow: 1px 1px 2px #4056B9;

`

const CourseName = styled.div`
    display: flex;
    flex: 30%;
`

const Title = styled.div`
    font-size: 36px;
    padding-right: 30px;
    display: flex;
    align-items: center;
    max-width: 50%;
`

const Teachers = styled.div`
    display: flex;
`

const Teacher = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 17px;
    font-weight: 300;

    .title{
        opacity: 0.8;
        font-size: 16px;
    }

`

const TeacherName = styled.div`
    font-size: 24px;
    font-weight: 500;
    opacity: 1;
    margin-right: 15px;
`

const TeacherEmail = styled.div`
    font-size: 14px;
    font-weight: 300;
    opacity: 0.8;
`

const StudentMenu = styled.div`
    display: flex;
    align-items: center;

    .name{
        font-size: 20px;
        font-weight: 500;
    }

    .email{
        font-size: 14px;
        font-weight: 300;
        opacity: 0.8;
    }

    .photo{
        background-color: white;
        width: 70px;
        height: 70px;
        border-radius: 50%;
        margin-left: 30px;
    }
`

const TasksNavBar = (props) => {
    
    return(
        <TasksNavBarContainer>
            <CourseName>
                <Title>
                    Базы данных
                </Title>
                <Teacher>
                    <div className="title">Преподаватели:</div>
                    <Teachers>
                        <TeacherName>
                            Иванов И.И.
                            <TeacherEmail>
                            IvanovII@mpei.ru
                            </TeacherEmail>
                        </TeacherName>
                        <TeacherName>
                            Иванова И.И
                            <TeacherEmail>
                            IvanovaII@mpei.ru
                            </TeacherEmail>
                        </TeacherName>
                    </Teachers>
                </Teacher>
            </CourseName>
            <StudentMenu>
                <div>
                    <div className="name">
                        Рыбкин Павел Владимирович
                    </div>
                    <div className="email">
                        pasjkeee@gmail.com
                    </div>
                </div>
                <div className="photo">
                    
                </div>
            </StudentMenu>
        </TasksNavBarContainer>
    )
}

export default TasksNavBar;