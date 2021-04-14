import {createStore, combineReducers} from 'redux';
import loginReducer from './reducers/login.reducer';
import coursesPageReducer from './reducers/coursesPage.reducer';
import coursesMainModalReducer from './reducers/coursesMainModal.reducer';

let rootReducer = combineReducers({
    coursesPage: coursesPageReducer, 
    login: loginReducer,
    coursesMain: coursesMainModalReducer
});

const store = createStore(rootReducer);


export default store;