import React from 'react';
import {connect} from 'react-redux';
import WithRestoService from '../../hoc';

import { Link } from 'react-router-dom'

import CoursesMainItem from '../courses-main-item';
import RestoService from '../../../services/resto-service';
import {changeTasks,isMounted,notMounted, getTeachersData} from '../../../actions';



class CoursesMain extends React.Component{

    constructor(props) {
        super(props);
        this.server = new RestoService();
        this.state = {
            data: []
        }
    }

    async componentDidMount(){

        try {
            const data = await this.server.getData('/api/auth/subjects');

            const teachersData = data.teachers.map(item => {
                return {
                    teacher_id: item.teacher_id,
                    teacher: `${item.first_name} ${item.last_name[0]}.${item.patronymic[0]}.`
                }
            });

            console.log(teachersData)
            
            this.setState({
                data: [...data.subjects]
            })
            this.props.getTeachersData(teachersData);
            this.props.changeTasks(data.tasks);
            console.log(data.subjects);
            this.props.isMounted();

        } catch(e) {
            console.log(e.message);
        }
    }

    componentWillUnmount() {
        this.props.notMounted();
    }

    render(){

        return(
            <>
                {
                    this.state.data.map((item) => {
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
}

const mapDispatchToProps = {
    changeTasks,
    isMounted,
    notMounted,
    getTeachersData
};


export default WithRestoService()(connect(null, mapDispatchToProps)(CoursesMain));