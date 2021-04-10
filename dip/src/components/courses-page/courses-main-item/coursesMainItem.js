import React from 'react';
import {connect} from 'react-redux';
import WithRestoService from '../../hoc';
import styled from 'styled-components';

import CoursesMainItemBtns from '../courses-main-item-btns'; 

import {setCurrentEditCourse} from '../../../actions';

import Img1 from '../courses-main/Asset 103.svg';
import Img2 from '../courses-main/Asset 104.svg';
import Img3 from '../courses-main/Asset 105.svg';
import Img4 from '../courses-main/Asset 106.svg';
import Img5 from '../courses-main/Asset 107.svg';
import Img6 from '../courses-main/Asset 108.svg';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages} from "@fortawesome/free-solid-svg-icons";

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

class CoursesMainItem extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text,
            id: this.props.courseKey,
            imgId: this.props.imgId,
            teacher: this.props.teacher
        }
        this.getCourse = this.getCourse.bind(this);
    }

    getCourse(){
        this.props.setCurrentEditCourse(this.state);
        console.log(this.state);
    }

    render(){

        console.log(this.props.courseKey);

        let icon;

        
        switch(this.props.imgId){
            case "1":
                icon = <CoursesMainItemImg src={Img1}/>;
                break;
            case "2":
                icon = <CoursesMainItemImg src={Img2}/>;
                break;
            case "3":
                icon = <CoursesMainItemImg src={Img3}/>;
                break;
            case "4":
                icon = <CoursesMainItemImg src={Img4}/>;
                break;
            case "5":
                icon = <CoursesMainItemImg src={Img5}/>;
                break;
            case "6":
                icon = <CoursesMainItemImg src={Img6}/>;
                break;
            default:
                icon = <FontAwesomeIcon icon={faImages} size="3x" color="#7D9FF4"/>
        }

        return(
            <CoursesMainItemDiv>
                <div className="courses-text">
                    {icon}
                    {this.props.text}
                    {this.props.teacher}
                </div>
                <CoursesMainItemBtns type="edit" num={this.props.courseKey} getCourse={this.getCourse} OnEditBtnClick={this.props.OnEditBtnClick} OnDeleteBtnClick={this.props.OnDeleteBtnClick}/>
            </CoursesMainItemDiv>
        )
    }
}

const mapStateToProps = (state) => {


}

const mapDispatchToProps = {
    setCurrentEditCourse
};


export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(CoursesMainItem));