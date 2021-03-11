import React from 'react';
import {connect} from 'react-redux';
import WithRestoService from '../hoc';
import {Switch, Route, Redirect} from 'react-router-dom';
import CoursesPage from '../courses-page';
import MainPage from '../main-page';



const App = (props) => {

    let isAuthenticated = false;
    if(props.userData || localStorage.getItem("userData")){
        isAuthenticated = true;
    }

    if(isAuthenticated){
        return (
            <Switch>
                <Route path="/courses" exact component={CoursesPage}/>
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
        isAutorized: state.isAutorized,
        userData: state.userData
    }
}


export default WithRestoService()(connect(mapStateToProps)(App));
