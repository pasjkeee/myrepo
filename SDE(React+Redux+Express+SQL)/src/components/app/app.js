import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';
import CoursesPage from '../courses-page';
import MainPage from '../main-page';
import Tasks from '../tasks';

import {getAuthenticated} from '../../actions/index';



const App = (props) => {

    useEffect(()=>{
        props.getAuthenticated();
    }, [])

    let isAuthenticated = false;
    if(props.isAutorized){
        isAuthenticated = true;
    }

    if(isAuthenticated){
        return (
            <Switch>
                <Route path="/courses" exact component={CoursesPage}/>
                <Route path="/courses/:courseId" exact component={Tasks}/>
                <Redirect to="/courses"/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact component={MainPage}></Route>
            <Redirect to="/" exact/>
        </Switch>
    )
}

const mapStateToProps = (state) => {
    return {
        isAutorized: state.login.isAutorized
    }
}

const mapDispatchToProps = {
    getAuthenticated
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
