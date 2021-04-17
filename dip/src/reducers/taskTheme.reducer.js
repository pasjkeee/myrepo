const initialState = {
    taskThemeData: [],
    taskThemeMounted: false
}

function taskThemeReducer(state = initialState, action){
    switch (action.type) {
        case 'SET_TASK_THEME_DATA':
            return { 
                ...state,
                taskThemeData: action.taskThemeData
            };

        case 'SET_TASK_THEME_MOUNTED':
            return {
                ...state,
                taskThemeMounted: action.taskThemeMounted
            }
            
        default: 
            return state;
    }
}

export default taskThemeReducer;