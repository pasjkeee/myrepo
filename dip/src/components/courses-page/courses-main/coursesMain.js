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

            const teachersData = [{
                teacher_id: 1,
                teacher: "Иванов И.И"
            },{
                teacher_id: 2,
                teacher: "Иванова И.И"
            },{
                teacher_id: 3,
                teacher: "Петров И.И"
            },{
                teacher_id: 4,
                teacher: "Кузюкин И.И"
            }]
            
            this.setState({
                data: [...data.subjects]
            })
            this.props.getTeachersData(teachersData);
            this.props.changeTasks(data.tasks);
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
                        console.log(item.subject_id);



                        return (
                            <Link to={`/courses/${item.subject_id}`} style={{ textDecoration: 'none' }} key = {item.subject_id}>
                                <CoursesMainItem
                                    courseKey = {item.subject_id}
                                    imgId="2"
                                    text = {item.subject}
                                    teacher = {` (${item.teachers})`}
                                    OnEditBtnClick={this.props.OnEditBtnClick}
                                    OnDeleteBtnClick={this.props.OnDeleteBtnClick}
                                />    
                            </Link>
                        )
                    })
                }
            </>
        )
    }
}


const mapStateToProps = (state) => {


}

const mapDispatchToProps = {
    changeTasks,
    isMounted,
    notMounted,
    getTeachersData
};


export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(CoursesMain));