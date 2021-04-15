import React, {useState, useEffect} from 'react';

import {connect} from 'react-redux';

import {coursesCloseModal, editCourse} from '../../../actions'

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
        
    let style = (props.active) ? { display: "block" } : { display: "none" };

    return(
        <div className="wrapper" style={style}>
            <div className="modal">
                <div className="close-btn" onClick={()=>{props.coursesCloseModal()}}>
                    <FontAwesomeIcon icon={faTimes} size="2x" color="#7D9FF4"/>
                </div>
                    <form>
                        <div className="modal__title">Изменить предмет <b>{courseTitle}</b></div>
                        <div className="modal__content">
                            <div className="modal__content-up">
                                <InputImg getImgNum={getImgNum} currentImgId={imgId}/>
                                <textarea   name="textarea" 
                                        rows="2" 
                                        placeholder="Введите название предмета" 
                                        required 
                                        onChange={(e)=>{OnTextareaChange(e)}} 
                                        value={textareaText}/>
                                </div>  
                            <div className="modal__content-bottom">
                            <div className="modal__content-teachers">
                                    <div className="modal__content-teachers-content">
                                        {teachersCount.map((item, i) => item)}
                                    </div>
                                    <div className="modal__content-teachers-btns">
                                        <FontAwesomeIcon icon={faPlusSquare} size="2x" color="#7D9FF4" cursor="pointer" onClick={()=>{onAddClick()}}/>
                                        <FontAwesomeIcon icon={faMinusSquare} size="2x" color="#7D9FF4" cursor="pointer" onClick={()=>{onDelClick()}}/>
                                    </div>
                                </div>
                                <input type="button" 
                                       name="btn" 
                                       className="modal__btn" 
                                       value="Добавить" 
                                       onClick={()=>{console.log({imgId, textareaText})}}/>
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
    coursesCloseModal
}


export default connect(mapStateToProps, mapDispatchToProps)(CoursesMainItemModalEdit);