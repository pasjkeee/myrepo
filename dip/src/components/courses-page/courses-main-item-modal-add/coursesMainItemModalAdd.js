import React, {useState} from 'react';

import {connect} from 'react-redux';
import {coursesCloseModal} from '../../../actions'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes} from "@fortawesome/free-solid-svg-icons";

import InputImg from '../input-img';

import TeachersData from '../teachers-data';

import '../modalStyle.scss';

const CoursesMainItemModalAdd = (props) => {

    let [imgNum, setImgNum] = useState(0);
    let [textareaText, setTextareaText] = useState("");

    const getImgNum = (imgNum) => {
        setImgNum(imgNum);
    }

    const OnTextareaChange = (e) => {
        setTextareaText(e.target.value);
    }

    let style = (props.active) ? { display: "block" } : { display: "none" };

    return(
        <div className="wrapper" style={style}>
            <div className="modal">
                <div className="close-btn" onClick={()=>{props.coursesCloseModal()}}>
                    <FontAwesomeIcon icon={faTimes} size="2x" color="#7D9FF4"/>
                </div>
                    <form>
                        <div className="modal__title">Добавить новый предмет</div>
                        <div className="modal__content">
                            <div className="modal__content-up">
                                <InputImg getImgNum={getImgNum}/>
                                <textarea name="textarea" 
                                          rows="2" 
                                          placeholder="Введите название предмета" 
                                          required 
                                          onChange={(e)=>{OnTextareaChange(e)}}/>
                            </div>
                            <div className="modal__content-bottom">
                                <TeachersData type="add"/>
                                <input type="button" 
                                       name="btn" 
                                       className="modal__btn" 
                                       value="Добавить" 
                                       onClick={()=>{console.log(imgNum, textareaText)}}/>
                                <input type="hidden" 
                                       name="imgNum" 
                                       value={imgNum}/>
                            </div>
                        </div>
                    </form>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        active: state.coursesMain.addActive
    }
}

const mapDispatchToProps = {
    coursesCloseModal
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesMainItemModalAdd);