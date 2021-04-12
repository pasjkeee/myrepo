import {createStore, combineReducers} from 'redux';
import loginReducer from './reducers/login.reducer';
import coursesPageReducer from './reducers/coursesPage.reducer';

let rootReducer = combineReducers({
    coursesPage: coursesPageReducer, 
    login: loginReducer
});

const store = createStore(rootReducer);


export default store;