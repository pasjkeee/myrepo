import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import CoursesMainItemBtns from '../courses-main-item-btns'; 

import {setCurrentEditCourse, editCourse} from '../../../actions';

import Img1 from '../courses-main/Asset 103.svg';
import Img2 from '../courses-main/Asset 104.svg';
import Img3 from '../courses-main/Asset 105.svg';
import Img4 from '../courses-main/Asset 106.svg';
import Img5 from '../courses-main/Asset 107.svg';
import Img6 from '../courses-main/Asset 108.svg';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages} from "@fortawesome/free-solid-svg-icons";


let img = [Img1, Img2, Img3, Img4, Img5, Img6];

const CoursesMainItemDiv = styled.div`
    position: relative;
    border: 0.1px solid #E2E8FF;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 40px 0px;
    background-color: #FFFFFF;
    font-weight: 700;
    font-size: 1.8rem;
    padding: 20px;
    cursor: pointer;
    box-shadow: 0 2px 8px rgb(125 159 244 / 50%);
    color: #4056B9;

    .courses-text{
        display: flex;
        align-items: center;
        max-width: 80%;
    }

    :hover{
        background-color: #e1e7ff;
    }
`

const CoursesMainItemImg = styled.img`
    height: 100px;
    max-width: 120px;
    background-color: #fff;
    margin: 20px 40px;
    padding: 10px 20px;
    object-fit: cover;
    border-radius: 10px;
`

const CoursesMainItem = (props) => {

    const getCourse = () => {
        props.editCourse(props.courseKey, props.text, props.imgId, props.teacher_id);
    }

    let icon;

    if(props.imgId > 0 || props.imgId < 7){
        icon = <CoursesMainItemImg src={img[+props.imgId-1]}/>;
    } else {
        icon = <FontAwesomeIcon icon={faImages} size="3x" color="#7D9FF4"/>
    }

    return(
        <CoursesMainItemDiv>
            <div className="courses-text">
                {icon}
                {props.text}
                {props.teacher}
            </div>
            <CoursesMainItemBtns type="edit" num={props.courseKey} getCourse={getCourse}/>
        </CoursesMainItemDiv>
    )
}

const mapDispatchToProps = {
    setCurrentEditCourse,
    editCourse
};


export default connect(null, mapDispatchToProps)(CoursesMainItem);