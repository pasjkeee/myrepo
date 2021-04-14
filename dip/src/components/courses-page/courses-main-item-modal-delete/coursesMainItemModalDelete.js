import React, {useState} from 'react';

import {connect} from 'react-redux';

import {coursesCloseModal} from '../../../actions'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes} from "@fortawesome/free-solid-svg-icons";

import '../modalStyle.scss';

const CoursesMainItemModalDelete = (props) => {

    let [textareaText, setTextareaText] = useState("");

    const OnTextareaChange = (e) => {
        setTextareaText(e.target.value);
    }
        
    let style = (props.active) ? { display: "block" } : { display: "none" };

    return(
        <div className="wrapper"  style={style}>
            <div className="modal">
                <div className="close-btn"  onClick={()=>{props.coursesCloseModal()}}>
                    <FontAwesomeIcon icon={faTimes} size="2x" color="#7D9FF4"/>
                </div>
                <form>
                    <div className="modal__title">Введите выделенный текст, чтобы удалить предмет <b>{props.currentEditCourse.text}</b></div>
                    <div className="modal__content">
                        <textarea name="textarea" 
                                    rows="2" 
                                    placeholder="Ввведите выделенный текст, чтобы удалить предмет" 
                                    required 
                                    onChange={(e)=>{OnTextareaChange(e)}} 
                                    value={textareaText}/>
                        <div className="modal__content-bottom">
                            <div></div>
                            <input type="button" name="btn" className="modal__btn" value="Удалить" onClick={()=>{console.log(textareaText)}}/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
    }

const mapStateToProps = (state) => {
    return {
        currentEditCourse: state.coursesPage.currentEditCourse,
        active: state.coursesMain.deleteActive
    }
}

const mapDispatchToProps = {
    coursesCloseModal
}




export default connect(mapStateToProps, mapDispatchToProps)(CoursesMainItemModalDelete);