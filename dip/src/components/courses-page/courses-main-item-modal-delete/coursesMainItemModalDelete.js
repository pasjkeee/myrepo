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

    const deleteCourse = () => {
        if(textareaText === props.currentEditCourse.courseTitle){
            let result = window.confirm("Вы действительно хотите удалить предмет?");
            if(result){
                console.log("Deleted");
            }
        } else {
            alert("Введите точное название прдемета, как в выделенном тексте")
        }
    }

    return(
        <div className="wrapper"  style={style}>
            <div className="modal">
                <div className="close-btn"  onClick={()=>{props.coursesCloseModal()}}>
                    <FontAwesomeIcon icon={faTimes} size="2x" color="#7D9FF4"/>
                </div>
                <form>
                    <div className="modal__title">Введите выделенный текст, чтобы удалить предмет <div className="modal__title-name-to-delete">{props.currentEditCourse.courseTitle}</div></div>
                    <div className="modal__content">
                    <div className="modal__lable-text-area">
                                    <label htmlFor="theme_modal_add_teaxtarea"                                               className="modal__textarea-label">
                                        Введите выделенный текст
                                    </label>
                                        <textarea name="textarea" 
                                        id="theme_modal_add_teaxtarea"
                                        rows="2" 
                                        placeholder="Ввведите выделенный текст, чтобы удалить предмет" 
                                        required 
                                        onChange={(e)=>{OnTextareaChange(e)}} 
                                        value={textareaText}/>
                                </div>
                        <div className="modal__content-bottom">
                            <div></div>
                            <input type="button" name="btn" className="modal__btn" value="Удалить" onClick={()=>{deleteCourse()}}/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
    }

const mapStateToProps = (state) => {
    return {
        currentEditCourse: state.coursesMain.currentInfo,
        active: state.coursesMain.deleteActive
    }
}

const mapDispatchToProps = {
    coursesCloseModal
}




export default connect(mapStateToProps, mapDispatchToProps)(CoursesMainItemModalDelete);