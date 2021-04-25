
import React from 'react';
import {connect} from 'react-redux';

import {taskThemeCloseModal } from '../../../actions'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlusSquare, faMinusSquare} from "@fortawesome/free-solid-svg-icons";

import './modals.scss';


const TaskThemeModalDelete = (props) => {

    if(!props.deleteActive){
        return false
    }

    return(
        <div className="task-theme-modal">
            <div className="task-theme-modal__dialog">
                <div className="task-theme-modal__content">
                    <div className="task-theme-modal__close"
                        onClick={()=>{props.taskThemeCloseModal()}}>
                        <FontAwesomeIcon icon={faTimes} size="1x" color="#7D9FF4"/>
                    </div>
                    <div className="task-theme-modal__title">
                        Удалить тему
                        <div className="task-theme-modal__title-name-to-delete">
                            Часть 1 Введение в Базы данных
                        </div>
                    </div>
                    <div className="task-theme-modal__subtitle">
                        <div className="task-theme-modal__subtitle-value">
                            {"Предмет: "} 
                            <span className="task-theme-modal__subtitle-value-subject">
                                Ситемы автоматизированного проектирования
                            </span>
                        </div>
                        <div className="task-theme-modal__subtitle-value">
                            {"Преподаватель: "} 
                            <span className="task-theme-modal__subtitle-value-teacher">
                                Иванов Сергей Сергеевич
                            </span>
                        </div>
                    </div>
                    <div className="task-theme-modal__lable-text-area">
                        <label htmlFor="theme_modal_add_teaxtarea" className="task-theme-modal__textarea-label">
                            Для удаления введите полное название темы
                        </label>
                        <textarea   id="task-theme-modal_modal_add_teaxtarea"
                                    className="task-theme-modal__textarea"
                                    name="textarea" 
                                    rows="2" 
                                    placeholder="Для удаления введите полное название темы"/>
                    </div>
                    <input type="button" 
                                       name="btn" 
                                       className="task-theme-modal__btn" 
                                       value="Удалить" />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        deleteActive: state.taskTheme.deleteActive
    }
}

const mapDispatchToProps = {
    taskThemeCloseModal
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskThemeModalDelete);