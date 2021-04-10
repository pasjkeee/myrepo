import React from 'react';
import styled from 'styled-components';
import WithRestoService from '../../hoc';
import {connect} from 'react-redux';

const TasksNavBarContainer = styled.div`
    width: 1140px;
    height: 100px;
    background-color: #2E3D54;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 30px;
    border-radius: 20px 20px 0px 0px;

`

const CourseName = styled.div`
    display: flex;
    flex: 30%;
`

const Title = styled.div`
    font-size: 30px;
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
    font-size: 14px;
    font-weight: 300;

    .title{
        margin-bottom: 5px;
        opacity: 0.5;
    }

`

const TeacherName = styled.div`
    font-size: 18px;
    font-weight: 500;
    opacity: 1;
    margin-right: 15px;
`

const TeacherEmail = styled.div`
    font-size: 12px;
    font-weight: 300;
    opacity: 0.8;
`

const StudentMenu = styled.div`
    display: flex;
    align-items: center;

    .name{
        font-size: 18px;
        font-weight: 500;
    }

    .email{
        font-size: 12px;
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

class TasksNavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render(){

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
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = {
};

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(TasksNavBar));