
import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlusSquare, faMinusSquare} from "@fortawesome/free-solid-svg-icons";

import SelectPosition from './selectPosition';

import './modals.scss';


const TaskThemeModalEdit = (props) => {


    return(
        <div className="task-theme-modal">
            <div className="task-theme-modal__dialog">
                <div className="task-theme-modal__content">
                    <div className="task-theme-modal__close">
                        <FontAwesomeIcon icon={faTimes} size="1x" color="#4056B9"/>
                    </div>
                    <div className="task-theme-modal__title">
                        Изменить тему
                        <div className="task-theme-modal__title-name">
                            Часть 1 Введение в Базы данных
                        </div>
                    </div>
                    <div className="task-theme-modal__subtitle">
                        <div className="task-theme-modal__subtitle-value">
                            {"Предмет: "} 
                            <span className="task-theme-modal__subtitle-value-subject">
                                Системы автоматизированного проектирования
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
                        <div className="task-theme-modal__lable-text-area">
                        <label      htmlFor="task-theme-modal_modal_edit_teaxtarea"                                  className="task-theme-modal__textarea-label">
                                Введите название темы
                        </label>
                        <textarea   id="task-theme-modal_modal_edit_teaxtarea"
                                    className="task-theme-modal__textarea"
                                    name="textarea" 
                                    rows="2" 
                                    placeholder="Введите новое название темы"/>
                        </div>
                    </div>
                    <div className="task-theme-modal__bottom">
                        <SelectPosition/>
                        <input type="button" 
                                name="btn" 
                                       className="task-theme-modal__btn" 
                                       value="Изменить" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskThemeModalEdit;