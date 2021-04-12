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
        justify-content: space-around;
        align-items: center;
        width: 100%;
        position: relative;
    }

    .teacher{
        margin-top: 20px;
        margin-left: 30px;
        color: #7D9FF4;
        font-size: 18px;
    }

    textarea{
        padding: 20px;
        color: 0F0F0F;
        font-size: 20px;
        resize: none; 
        width: 80%;
        outline: none;
        border: 1px solid #7D9FF4;
        border-radius: 5px; 
    }

    .btn{
        position: absolute;
        width: 150px;
        height: 30px;
        right: 30px;
        bottom: -50px;
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

class CoursesMainItemModalEdit extends React.Component{

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

    componentDidUpdate(prevProps){
        if(this.props.active !== prevProps.active){
            this.setState({
                textareaText: this.props.currentEditCourse.text
            });
        }
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
                            <div className="title">Изменить предмет <b>{this.props.currentEditCourse.text}</b></div>
                            <div className="edit-content">
                                <InputImg getImgNum={this.getImgNum} currentImgId={this.props.currentEditCourse.imgId}/>
                                <textarea name="textarea" rows="2" placeholder="Введите название предмета" required onChange={(e)=>{this.OnTextareaChange(e)}} value={this.state.textareaText}></textarea>
                                <input type="button" name="btn" className="btn" value="Добавить" onClick={()=>{console.log(this.state)}}/>
                                <input type="hidden" name="imgNum" value={this.state.imgNum}/>
                            </div>
                            <TeachersData  ChangeImgActiveTrue={this.ChangeImgActiveTrue} ChangeImgActiveFalse={this.ChangeImgActiveFalse} type="edit" />
                        </form>
                </ModalAddContainer>
            </Wrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentEditCourse: state.coursesPage.currentEditCourse
    }
}



export default connect(mapStateToProps)(CoursesMainItemModalEdit);