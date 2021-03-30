import React from 'react';
import {connect} from 'react-redux';
import WithRestoService from '../../hoc';

import { Link } from 'react-router-dom'

import CoursesMainItem from '../courses-main-item';
import RestoService from '../../../services/resto-service';
import {changeTasks,isMounted,notMounted} from '../../../actions';
import Img1 from './Asset 103.svg';
import Img2 from './Asset 104.svg';
import Img3 from './Asset 105.svg';
import Img4 from './Asset 106.svg';



class CoursesMain extends React.Component{

    constructor(props) {
        super(props);
        this.server = new RestoService();
        this.state = {
            data: []
        }
    }

    _isMounted = false;

    async componentDidMount(){

        this._isMounted = true;
        try {
            const data = await this.server.getData('/api/auth/subjects');
            console.log(data.tasks);
            if (this._isMounted) {
                this.setState({
                    data: [...data.subjects]
                })
                this.props.changeTasks(data.tasks);
                this.props.isMounted();
            }
        } catch(e) {
            console.log(e.message);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.props.notMounted();
    }

    loadInfo = async (e) => {
        e.preventDefault();
        
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
                                    imgUrl = {Img1}
                                    text = {`${item.subject} (${item.teachers})`}
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
    notMounted
};


export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(CoursesMain));