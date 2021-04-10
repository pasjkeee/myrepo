import React from 'react';
import styled from 'styled-components';

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
    align-items: flex-start;
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

    .add-content{
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        position: relative;
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
        bottom: -45px;
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
        position: relative;
        left: 30px;
        margin-bottom: 20px;
        color: #7D9FF4;
        font-size: 26px;
        display: inline-block;
    }
    
`

const ModalAddClose = styled.div`
    position: absolute;
    right: 10px;
    top: 10px;
    display: inline-block; 
    cursor: pointer;
    z-index: 10;

    :hover{
        transform: scale(1.1);
    }
`

export default class CoursesMainItemModalAdd extends React.Component{

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

        return(
            <Wrapper  style={style}>
                <ModalAddContainer>
                    <ModalAddClose onClick={()=>{this.props.OnCloseBtnClick()}}>
                        <FontAwesomeIcon icon={faTimes} size="2x" color="#7D9FF4"/>
                    </ModalAddClose>
                        <form>
                            <div className="title">Добавить новый предмет</div>
                            <div className="add-content">
                                <InputImg getImgNum={this.getImgNum} textTeacherActive={this.state.textTeacherActive}/>
                                <textarea name="textarea" rows="2" placeholder="Введите название предмета" required onChange={(e)=>{this.OnTextareaChange(e)}}></textarea>
                                <input type="button" name="btn" className="btn" value="Добавить" onClick={()=>{console.log(this.state)}}/>
                                <input type="hidden" name="imgNum" value={this.state.imgNum}/>
                            </div>
                            <TeachersData ChangeImgActiveTrue={this.ChangeImgActiveTrue} ChangeImgActiveFalse={this.ChangeImgActiveFalse} type="add"/>
                        </form>
                </ModalAddContainer>
            </Wrapper>
        )
    }
}