import React, {useState, useEffect} from 'react';

import {connect} from 'react-redux';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes} from "@fortawesome/free-solid-svg-icons";

import InputImg from '../input-img';
import TeachersData from '../teachers-data';

import '../modalStyle.scss';

const CoursesMainItemModalEdit = (props) => {
    
    let [imgNum, setImgNum] = useState(0);
    let [textareaText, setTextareaText] = useState("");
    let [textTeacherActive, setTextTeacherActive] = useState(false);

    useEffect(()=>{
        setTextareaText(props.currentEditCourse.text);
    }, [props.active, props.currentEditCourse.text]);

    const getImgNum = (imgNum) => {
        setImgNum(imgNum);
    }

    const OnTextareaChange = (e) => {
        setTextareaText(e.target.value);
    }

    const ChangeImgActiveTrue = () => {
        setTextTeacherActive(true);
    }

    const ChangeImgActiveFalse = () => {
        setTextTeacherActive(false);
    }
        
    let style = (props.active) ? { display: "block" } : { display: "none" };

    return(
        <div className="wrapper" style={style}>
            <div className="modal">
                <div className="close-btn" onClick={()=>{props.OnEditCloseBtnClick()}}>
                    <FontAwesomeIcon icon={faTimes} size="2x" color="#7D9FF4"/>
                </div>
                    <form>
                        <div className="modal__title">Изменить предмет <b>{props.currentEditCourse.text}</b></div>
                        <div className="modal__content">
                            <div className="modal__content-up">
                                <InputImg getImgNum={getImgNum} currentImgId={props.currentEditCourse.imgId}/>
                                <textarea   name="textarea" 
                                        rows="2" 
                                        placeholder="Введите название предмета" 
                                        required 
                                        onChange={(e)=>{OnTextareaChange(e)}} 
                                        value={textareaText}/>
                                </div>  
                            <div className="modal__content-bottom">
                                <TeachersData  ChangeImgActiveTrue={ChangeImgActiveTrue} ChangeImgActiveFalse={ChangeImgActiveFalse} type="edit" />
                                <input type="button" name="btn" className="modal__btn" value="Добавить" onClick={()=>{console.log({imgNum, textareaText, textTeacherActive})}}/>
                                <input type="hidden" name="imgNum" value={imgNum}/>
                            </div>
                        </div>
                        
                    </form>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        currentEditCourse: state.coursesPage.currentEditCourse
    }
}



export default connect(mapStateToProps)(CoursesMainItemModalEdit);