import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';
import CoursesPage from '../courses-page';
import MainPage from '../main-page';
import Tasks from '../tasks';



const App = (props) => {

    console.log(props);
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


export default connect(mapStateToProps)(App);
