import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import { Link } from 'react-router-dom'

import CoursesMainItem from '../courses-main-item';
import {changeTasks,isMounted,notMounted, getTeachersData, getCoursesMainData} from '../../../actions';



const CoursesMain = (props) => {

    let [data, setData] = useState([]);

    useEffect(()=>{
        props.getCoursesMainData();
    },[])

    useEffect(()=>{
        setData(props.coursesData);

        return () => {props.notMounted()}
    },[props.coursesData.length])

    if(data.length === 0){
        return <></>
    }

        return(
            <>
                {
                    data.map((item) => {
                        return (
                            <Link to={`/courses/${item.subject_id}`} style={{ textDecoration: 'none' }} key = {item.subject_id}>
                                <CoursesMainItem
                                    key = {item.subject_id}
                                    courseKey = {item.subject_id}
                                    imgId="2"
                                    text = {item.subject}
                                    teacher_id = {item.teacher_id}
                                    teacher = {`(${item.teachers})`}
                                />    
                            </Link>
                        )
                    })
                }
            </>
        )
    }

const mapStateToProps = (state) => {
    return {
        isMounted: state.coursesPage.isMounted,
        coursesData: state.coursesPage.coursesData
    }
}

const mapDispatchToProps = {
    changeTasks,
    isMounted,
    notMounted,
    getTeachersData,
    getCoursesMainData
};


export default connect(mapStateToProps, mapDispatchToProps)(CoursesMain);