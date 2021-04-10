import React from 'react';
import styled from 'styled-components';

import {connect} from 'react-redux';
import WithRestoService from '../../hoc';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes} from "@fortawesome/free-solid-svg-icons";

import InputImg from '../input-img';
import TeachersData from '../teachers-data';

const Wrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100vh;
    top: 0px;
    left: 0px;
    overflow: hidden;
    background-color: rgba(0,0,0,0.7);
    z-index: 1100;
`

const ModalAddContainer = styled.div`
    width: 1140px;
    height: 250px;
    border: 0.1px solid #E2E8FF;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #FFFFFF;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -80%);
    padding: 20px 30px;

    form{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 100%;
        position: relative;
    }

    .edit-content{
        display: flex;
        align-items: center;
        position: relative;
        margin: 0px 30px 0px 30px;
    }

    textarea{
        padding: 20px;
        color: 0F0F0F;
        font-size: 20px;
        resize: none; 
        width: 100%;
        outline: none;
        border: 1px solid #7D9FF4;
        border-radius: 5px; 
    }

    .btn{
        position: absolute;
        width: 150px;
        height: 30px;
        bottom: -40px;
        right: 0px;
        background-color: #7D9FF4;
        border: 1px solid #7D9FF4;
        color: white;
        cursor: pointer;
        font-weight: 500;
        outline: none;

        :hover{
            color: #7D9FF4;
            background-color: #FFFFFF;
        }
    }

    .title{
        margin-bottom: 20px;
        margin-left: 30px;
        position: relative;
        color: #7D9FF4;
        font-size: 18px;
    }
    
`

const ModalAddClose = styled.div`
    position: absolute;
    right: 10px;
    top: 10px;
    display: inline-block; 
    cursor: pointer;

    :hover{
        transform: scale(1.1);
    }
`

class CoursesMainItemModalDelete extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            imgNum: 0,
            textareaText: "",
            textTeacherActive: false
        };

        this.getImgNum = this.getImgNum.bind(this);
        this.OnTextareaChange = this.OnTextareaChange.bind(this);
        this.ChangeImgActiveTrue = this.ChangeImgActiveTrue.bind(this);
        this.ChangeImgActiveFalse = this.ChangeImgActiveFalse.bind(this);
    }

    getImgNum(imgNum){
        this.setState({
            imgNum: imgNum
        })
    }

    OnTextareaChange(e){
        this.setState({
            textareaText: e.target.value
        })
    }

    ChangeImgActiveTrue(){
        this.setState({
            textTeacherActive: true
        })
    }

    ChangeImgActiveFalse(){
        this.setState({
            textTeacherActive: false
        })
    }

    render(){

        let style = (this.props.active) ? { display: "block" } : { display: "none" };
        console.log(this.props.currentEditCourse);

        return(
            <Wrapper  style={style}>
                <ModalAddContainer>
                    <ModalAddClose onClick={()=>{this.props.OnEditCloseBtnClick()}}>
                        <FontAwesomeIcon icon={faTimes} size="2x" color="#7D9FF4"/>
                    </ModalAddClose>
                        <form>
                            <div className="title">Ввведите выделенный текст, чтобы удалить предмет <b>{this.props.currentEditCourse.text}</b></div>
                            <div className="edit-content">
                                <textarea name="textarea" rows="2" placeholder="Ввведите выделенный текст, чтобы удалить предмет" required onChange={(e)=>{this.OnTextareaChange(e)}} value={this.state.textareaText}></textarea>
                                <input type="button" name="btn" className="btn" value="Удалить" onClick={()=>{console.log(this.state)}}/>
                                <input type="hidden" name="imgNum" value={this.state.imgNum}/>
                            </div>
                        </form>
                </ModalAddContainer>
            </Wrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentEditCourse: state.currentEditCourse
    }
}



export default WithRestoService()(connect(mapStateToProps)(CoursesMainItemModalDelete));