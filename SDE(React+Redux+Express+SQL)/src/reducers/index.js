let now = new Date();

const initialState = {
    modalDisplay: "none",
    envYear: now.getFullYear(),
    envMonth: now.getMonth(),
    envDay: now.getDate(),
    calDisplay: false,
    userData: "",
    userId: "",
    isAutorized: false,
    obj: [],
    isMounted: false,
    currentEditCourse: {},
    teachersData: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CLOSE_MODAL':
            return { 
                 ...state,
                 modalDisplay: "none"
            };
        case 'OPEN_MODAL':
            return { 
                ...state,
                modalDisplay: "block"
            };
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
        
        case 'LOG_IN':
            const UserId = action.userId;
            const UserData = action.userData;
            localStorage.setItem('userData', JSON.stringify({
                UserId, UserData
            }));
            return { 
                 ...state,
                 userData: action.userData,
                 userId: action.userId,
                 isAutorized: true
            };
        
        case 'LOG_OUT':
            localStorage.removeItem('userData');
            return { 
                 ...state,
                 userData: "",
                 userId: "",
                 isAutorized: false
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
       
        default: 
            return state;
        
    }
}

export default reducer;