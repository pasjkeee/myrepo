import React from "react";
import {Switch, Route, Redirect} from 'react-router-dom';
import CoursesPage from '../courses-page';
import MainPage from '../main-page';

export const useRoutes = isAuthenticated => {
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