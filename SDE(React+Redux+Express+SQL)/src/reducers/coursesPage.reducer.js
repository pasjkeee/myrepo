let now = new Date();

const initialState = {
    envYear: now.getFullYear(),
    envMonth: now.getMonth(),
    envDay: now.getDate(),
    calDisplay: false,
    obj: [],
    isMounted: false,
    currentEditCourse: {},
    teachersData: [],
    coursesData: [], //Информация по предметам,
    selectedId: -1
}

function coursesPageReducer(state = initialState, action){
    switch (action.type) {
        case 'NEXT_MONTH':
            let monthNext = state.envMonth;
            let yearNext = state.envYear;
            monthNext++;
            if(monthNext === 12){
                yearNext++;
                monthNext = 0;
            }
            return { 
                ...state,
                envYear: yearNext,
                envMonth: monthNext
            };
        case 'PREV_MONTH':
            let monthPrev = state.envMonth;
            let yearPrev = state.envYear;
            monthPrev--;
            if(monthPrev === -1){
                yearPrev--;
                monthPrev = 11;
            }
            return { 
                ...state,
                envYear: yearPrev,
                envMonth: monthPrev
            };
        case 'TOGGLE_CAL':
            let newcalDisplay = state.calDisplay;
            return { 
                 ...state,
                 calDisplay: !newcalDisplay
            };

        case 'CHANGE_TASKS':
            return {
                ...state,
                obj: action.taskData
            };

        case 'IS_MOUNTED':
            return {
                ...state,
                isMounted: true
            };
        
        case 'NOT_MOUNTED':
            return {
                ...state,
                isMounted: false
            };

        case 'SET_CURRENT_EDIT_COURSE':
            return {
                ...state,
                currentEditCourse: action.data
            };

        case 'GET_TEACHERS_DATA':
            return {
                ...state,
                teachersData: action.teachersData
            };
        case 'SET_COURSES_DATA':
            return{
                ...state,
                coursesData: action.coursesData
            }
        case 'ADD_NEW_COURSE':
            let newDataItem = action.coursesData;
            newDataItem.subject_id = +(new Date());
            return{
                ...state,
                coursesData: action.coursesData
            }

        case 'SET_SELECTED_ID':
            if(state.selectedId !==action.selectedId){
                //console.log(action.selectedId);
                return{
                    ...state,
                    selectedId: action.selectedId
                }
            }
            return{...state}
            

        case 'REMOVE_SELECTED_ID':
            //console.log("out");
            return{
                ...state,
                selectedId: -1
            }
       
        default: 
            return state;
        
    }
}

export default coursesPageReducer;