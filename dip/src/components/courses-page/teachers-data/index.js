import React, {useState} from 'react';
import styled from 'styled-components';

import {connect} from 'react-redux';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight} from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
    display: flex;
    align-items: center;

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
    posiiton: relative;

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
    left: 154px;
    bottom: 0px;
    transform: translateY(100%);
    background-color: white;

    .item{
        font-weight: 500;
        font-size: 16px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #7D9FF4;
        user-select: none;
        
        :hover{
            background-color: #E2E8FF;
        }

        :last-child{
            border-bottom: none;
        }
    }
`

const TeachersData = (props) => {

    let [active, setActive] = useState(false);
    let [choosedTeacher, setChoosedTeacher] = useState({});

    const OnActive = () => {
        const newActive = !active;
        if(newActive){
            props.ChangeImgActiveTrue();
        } else {
            props.ChangeImgActiveFalse();
        }
        setActive(newActive);
    }

    const OnTeacherSet = (teacher_id) => {
        const teacher = props.teachersData.find((item) => item.teacher_id === teacher_id);
        setChoosedTeacher(teacher);
    }

        const teachersData = (active) ? (<TeachersContainer> 
                                            { props.teachersData.map(item => <div className="item" key={item.teacher_id} onClick={()=>{OnTeacherSet(item.teacher_id)}}>{item.teacher}</div>)} 
                                        </TeachersContainer>) : false;
        const iconRotation = (active) ? 90 : 0; 
        let defaultText = "";
        if(props.type === "add"){
            defaultText = "Выберите преподавателя"
        }
        if(props.type === "edit"){
            defaultText = "Выберите преподавателя"
        }
        const teacherChoosed = (choosedTeacher.teacher_id) ? choosedTeacher.teacher : defaultText;

        return(
            <>
                <Wrapper>
                    <div className="teacher-title">Преподаватель: </div>
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
        teachersData: state.coursesPage.teachersData
    }
}



export default connect(mapStateToProps)(TeachersData);