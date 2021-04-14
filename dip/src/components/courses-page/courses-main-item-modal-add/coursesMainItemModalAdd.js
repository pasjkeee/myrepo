import React, {useState} from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes} from "@fortawesome/free-solid-svg-icons";

import InputImg from '../input-img';

import TeachersData from '../teachers-data';

import '../modalStyle.scss';

const CoursesMainItemModalAdd = (props) => {

    let [imgNum, setImgNum] = useState(0);
    let [textareaText, setTextareaText] = useState("");
    let [textTeacherActive, setTextTeacherActive] = useState(false);

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
                <div className="close-btn" onClick={()=>{props.OnCloseBtnClick()}}>
                    <FontAwesomeIcon icon={faTimes} size="2x" color="#7D9FF4"/>
                </div>
                    <form>
                        <div className="modal__title">Добавить новый предмет</div>
                        <div className="modal__content">
                            <div className="modal__content-up">
                                <InputImg getImgNum={getImgNum} textTeacherActive={textTeacherActive}/>
                                <textarea name="textarea" rows="2" placeholder="Введите название предмета" required onChange={(e)=>{OnTextareaChange(e)}}></textarea>
                            </div>
                            <div className="modal__content-bottom">
                                <TeachersData ChangeImgActiveTrue={ChangeImgActiveTrue} ChangeImgActiveFalse={ChangeImgActiveFalse} type="add"/>
                                <input type="button" name="btn" className="modal__btn" value="Добавить" onClick={()=>{console.log(imgNum, textareaText, textTeacherActive)}}/>
                                <input type="hidden" name="imgNum" value={imgNum}/>
                            </div>
                        </div>
                    </form>
            </div>
        </div>
    )
}

export default CoursesMainItemModalAdd;