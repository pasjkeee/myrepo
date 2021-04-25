import React, {useState} from 'react';

import {connect} from 'react-redux';
import {coursesCloseModal, addCourse, addNewCourse, addNewCourseToDatabase, getCoursesMainData} from '../../../actions'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlusSquare, faMinusSquare} from "@fortawesome/free-solid-svg-icons";

import InputImg from '../input-img';

import TeachersData from '../teachers-data';

import '../modalStyle.scss';

const CoursesMainItemModalAdd = (props) => {

    let [imgNum, setImgNum] = useState(0);
    let [textareaText, setTextareaText] = useState("");
    let [teachersId, setTeachersId] = useState([]);
    let [teachersCount, setTeachersCount] = useState([<TeachersData type="add" 
                                                                    num="0" 
                                                                    key="0"
                                                                    setTeachersId={setTeachersId}
                                                                    teachersId={teachersId}
                                                        />]);
    const getImgNum = (imgNum) => {
        setImgNum(imgNum);
    }

    const OnTextareaChange = (e) => {
        setTextareaText(e.target.value);
    }

    const onAddClick = () => {
        let newTeachersCount = [...teachersCount];
        if(newTeachersCount.length < props.teachersData.length){
            newTeachersCount.push(<TeachersData type="add" 
                                            num={newTeachersCount.length} 
                                            key={newTeachersCount.length}
                                            setTeachersId={setTeachersId}
                                            teachersId={teachersId}
                                            
                            />);
            setTeachersCount(newTeachersCount);
        }
    }

    const onDelClick = () => {
        let newTeachersCount = [...teachersCount];
        let newteachersId = [...teachersId];
        if(newTeachersCount.length > 1){
            newTeachersCount.pop();
            setTeachersCount(newTeachersCount);
            newteachersId.pop();
            setTeachersId(newteachersId);
        }
    }

    const onAddCourseClick = () => {
        let flag = true;
        teachersId.forEach(item => {
            if(!item){
                flag = false
            }  
        })
        if(!imgNum){
            alert( "Укажите изобраение" );
        } else if(!textareaText){
            alert( "Введите название предмета" );
        } else if(!teachersId.length){
            alert( "Укажите преодавателя" );
        }else if(!flag || teachersId.length !== teachersCount.length){
            alert( "Укажите всех преодавателей" );
        }else{
            props.addNewCourseToDatabase(textareaText, imgNum, teachersId)
            .then(()=>{
                props.coursesCloseModal();
                props.getCoursesMainData();
            })
        }
        
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
                                <div className="modal__lable-text-area">
                                    <label htmlFor="theme_modal_add_teaxtarea" className="modal__textarea-label">
                                        Введите название предмета
                                    </label>
                                        <textarea   id="theme_modal_add_teaxtarea"
                                                    name="textarea" 
                                                    rows="2" 
                                                    placeholder="Введите название предмета" 
                                                    required 
                                                    onChange={(e)=>{OnTextareaChange(e)}}/>
                                </div>
                            </div>
                            <div className="modal__content-bottom">
                                <div className="modal__content-teachers">
                                    <div className="modal__content-teachers-content">
                                        {teachersCount.map((item, i) => item)}
                                    </div>
                                    <div className="modal__content-teachers-btns">
                                        <FontAwesomeIcon icon={faPlusSquare} size="2x" color="#7D9FF4" cursor="pointer" onClick={()=>{onAddClick()}} style={{marginRight: "5px"}}/>
                                        <FontAwesomeIcon icon={faMinusSquare} size="2x" color="#7D9FF4" cursor="pointer" onClick={()=>{onDelClick()}}/>
                                    </div>
                                </div>
                                <input type="button" 
                                       name="btn" 
                                       className="modal__btn" 
                                       value="Добавить" 
                                       onClick={()=>{onAddCourseClick()}}/>
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
        teachersData: state.coursesPage.teachersData,
        active: state.coursesMain.addActive
    }
}

const mapDispatchToProps = {
    coursesCloseModal,
    addCourse,
    addNewCourse,
    addNewCourseToDatabase,
    getCoursesMainData
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesMainItemModalAdd);