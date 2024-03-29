import React, {useState, useEffect} from 'react';

import {connect} from 'react-redux';

import {coursesCloseModal, getCoursesMainData, editCourseInDatabase} from '../../../actions'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlusSquare, faMinusSquare} from "@fortawesome/free-solid-svg-icons";

import InputImg from '../input-img';
import TeachersData from '../teachers-data';

import '../modalStyle.scss';

const CoursesMainItemModalEdit = (props) => {
    
    let [imgId, setImgNum] = useState(0);
    let [textareaText, setTextareaText] = useState("");
    let [teachersId, setTeachersId] = useState([]);
    let [teachersCount, setTeachersCount] = useState([]);
    console.log(props);
    let {courseId, courseTitle, imgNum, courseTeacherIds} = props.currentInfo;

    useEffect(()=>{
        console.log(courseTitle, imgNum, courseTeacherIds);
        setImgNum(imgNum);
        setTextareaText(courseTitle);
        setTeachersId(courseTeacherIds);
        if(courseTeacherIds && courseTeacherIds.length > 0){
            setTeachersCount(courseTeacherIds.map((item, i) => <TeachersData type="edit" 
                                                                num={i} 
                                                                key={i} 
                                                                setTeachersId={setTeachersId}
                                                                teachersId={teachersId}
                                                                teacher={item}
                                                          />))
        }
    }, [courseTitle, imgNum, courseTeacherIds])

    const getImgNum = (imgNum) => {
        setImgNum(imgNum);
    }

    const OnTextareaChange = (e) => {
        setTextareaText(e.target.value);
    }

    const onAddClick = () => {
        let newTeachersCount = [...teachersCount];
        console.log(teachersId, teachersCount);
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

    const onEditClick = (e) => {
        e.preventDefault();
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
            console.log(textareaText, imgId, teachersId, courseId);
            props.editCourseInDatabase(textareaText, imgId, teachersId, courseId);
            props.coursesCloseModal();
            props.getCoursesMainData();
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
                        <div className="modal__title">Изменить предмет <div className="modal__title-name">{courseTitle}</div></div>
                        <div className="modal__content">
                            <div className="modal__content-up">
                                <InputImg getImgNum={getImgNum} currentImgId={imgId}/>
                                <div className="modal__lable-text-area">
                                    <label htmlFor="theme_modal_add_teaxtarea"                                               className="modal__textarea-label">
                                        Введите новое название предмета
                                    </label>
                                    <textarea   id="theme_modal_add_teaxtarea"
                                                name="textarea" 
                                                rows="2" 
                                                placeholder="Введите название предмета" 
                                                required 
                                                onChange={(e)=>{OnTextareaChange(e)}} 
                                                value={textareaText}/>
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
                                       onClick={(e)=>{onEditClick(e)}}/>
                                <input type="hidden" name="imgNum" value={imgId}/>
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
        currentEditCourse: state.coursesPage.currentEditCourse,
        active: state.coursesMain.editActive,
        currentInfo: state.coursesMain.currentInfo
    }
}

const mapDispatchToProps = {
    coursesCloseModal,
    editCourseInDatabase,
    getCoursesMainData
}


export default connect(mapStateToProps, mapDispatchToProps)(CoursesMainItemModalEdit);