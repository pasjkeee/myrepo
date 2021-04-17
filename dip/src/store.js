import {createStore, combineReducers, applyMiddleware} from 'redux';
import loginReducer from './reducers/login.reducer';
import coursesPageReducer from './reducers/coursesPage.reducer';
import coursesMainModalReducer from './reducers/coursesMainModal.reducer';
import taskThemeReducer from './reducers/taskTheme.reducer';

import thunk from 'redux-thunk'

let rootReducer = combineReducers({
    coursesPage: coursesPageReducer, 
    login: loginReducer,
    coursesMain: coursesMainModalReducer,
    taskTheme: taskThemeReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));


export default store;