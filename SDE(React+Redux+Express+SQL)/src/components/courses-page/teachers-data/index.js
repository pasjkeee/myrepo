import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import {connect} from 'react-redux';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight} from "@fortawesome/free-solid-svg-icons";

import { coursesOpenTeacherData, coursesCloseTeacherData, setCurrentActiveTeacher} from '../../../actions'

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    margin-right: 20px;
    position: relative;

    .teacher-title{
        margin-right: 20px;
        font-weight: 500;
        color: #7D9FF4;
        font-size: 18px;
    }
`

const MainContainer = styled.div`

    width: 300px;
    height: 40px;
    border: 2px solid #7D9FF4;
    border-radius: 4px;
    display: flex;
    padding: 0px 10px;
    align-items: center;
    cursor: pointer;
    position: relative;
    margin-bottom: 10px;
    margin-left: 0px;

    &:first-child{
        margin-left: 0px;
    }

    .text{
        font-weight: 700;
        color: #7D9FF4;
        font-size: 16px;
        user-select: none;
    }
`

const TeachersContainer = styled.div`
    position: absolute;
    width: 300px;
    border: 2px solid #7D9FF4;
    border-top: none;
    border-radius: 0px 0px 4px 4px;
    left: -2px;
    bottom: -2px;
    transform: translateY(100%);
    background-color: white;
    z-index: 1500;

    .item{
        font-weight: 500;
        font-size: 16px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #7D9FF4;
        user-select: none;
        background-color: #FFFFFF;
        z-index: 1500;
        
        :hover{
            background-color: #E2E8FF;
        }

        :last-child{
            border-bottom: none;
        }
    }
`

const TeachersData = (props) => {

    let [choosedTeacher, setChoosedTeacher] = useState({});

    const OnActive = () => {
        const newActive = !props.teacherDataActive;
        props.setCurrentActiveTeacher(+props.num);
        if(newActive){
            props.coursesOpenTeacherData();
        } else {
            props.coursesCloseTeacherData();
        }
    }

    const OnTeacherSet = (teacher_id) => {
        const teacher = props.teachersData.find((item) => item.teacher_id === teacher_id);
        let teachersId = [...props.teachersId];
        teachersId[+props.num] = teacher_id;
        props.setTeachersId(teachersId);
        setChoosedTeacher(teacher);
    }

        const teachersData = (props.teacherDataActive && props.currentActiveTeacher === +props.num) && (
                    <TeachersContainer> 
                        {props.teachersData.map(item => 
                                                    
                                                      { if(props.teachersId.includes(item.teacher_id)){
                                                          return false
                                                        }
                                                          return(<div className="item" 
                                                              key={item.teacher_id} 
                                                              onClick={()=>{OnTeacherSet(item.teacher_id)}}>{item.teacher}
                                                            </div>)})} 
                    </TeachersContainer>);

        const iconRotation = (props.teacherDataActive && props.currentActiveTeacher === +props.num) ? 90 : 0; 

        const teacherTitle = (+props.num === 0) && <div className="teacher-title">Преподаватель: </div>

        let defaultText = "";
        if(props.type === "add"){
            defaultText = "Выберите преподавателя"
        }
        if(props.type === "edit"){
           console.log(props.teachersData, props.teacher)
           defaultText = props.teachersData.filter(item => item.teacher_id === props.teacher);
           defaultText = defaultText[0].teacher;
        }

        useEffect(()=>{
            if(props.type === "edit"){
                const teacher = props.teachersData.find((item) => +item.teacher_id ===  props.teacher);
                let teachersId = [...props.teachersId];
                teachersId[+props.num] = +props.teacher;
                props.setTeachersId(teachersId);
                setChoosedTeacher(teacher);
            }
        },[])

        const teacherChoosed = (choosedTeacher.teacher_id) ? choosedTeacher.teacher : defaultText;

        return(
            <>
                <Wrapper>
                    {teacherTitle}
                    <MainContainer onClick={()=>{OnActive()}}>
                        <FontAwesomeIcon icon={faAngleRight} size="2x" rotation={iconRotation} color="#7D9FF4" style={{marginRight: "15px"}}/>
                        <div className="text">
                            {teacherChoosed}
                        </div> 
                        {teachersData}
                    </MainContainer>
                </Wrapper>
            </>
        )
    }


const mapStateToProps = (state) => {
    return {
        teachersData: state.coursesPage.teachersData,
        teacherDataActive: state.coursesMain.teacherDataActive,
        currentActiveTeacher: state.coursesMain.currentActiveTeacher
    }
}

const mapDispatchToProps = {
    coursesOpenTeacherData,
    coursesCloseTeacherData,
    setCurrentActiveTeacher
}


export default connect(mapStateToProps, mapDispatchToProps)(TeachersData);