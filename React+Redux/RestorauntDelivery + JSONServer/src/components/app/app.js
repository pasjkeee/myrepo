import React from 'react';
import {MainPage, CartPage, ItemPage} from '../pages';
import AppHeader from '../app-header';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import WithRestoService from '../hoc';

import Background from './food-bg.jpg';

const App = ({fullPrice}) => {
    return (
        <div style={{background: `url(${Background}) center center/cover no-repeat`, minHeight: '100vh' }} className="app">
            <AppHeader total={fullPrice}/>
            <Route path='/' exact component={MainPage}/>
            <Route path='/items/:id' component={ItemPage}/>
            <Route path='/cart' exact component={CartPage}/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        fullPrice: state.fullPrice
    }
}


export default WithRestoService()(connect(mapStateToProps)(App));
