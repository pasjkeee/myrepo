const initialState = {
    taskThemeData: [],
    taskThemeMounted: false,
    addActive: false,
    editActive: false,
    deleteActive: false,
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

        case 'TASK_THEME_CLOSE_MODAL':
            return { 
                    ...state,
                    addActive: false,
                    editActive: false,
                    deleteActive: false,
                }
                
        case 'TASK_THEME_OPEN_MODAL_ADD':
            return { 
                ...state,
                addActive: true,
                editActive: false,
                deleteActive: false
            };
    
        case 'TASK_THEME_OPEN_MODAL_EDIT':
            console.log("heugue");
            return { 
                ...state,
                addActive: false,
                editActive: true,
                deleteActive: false
            };

        case 'TASK_THEME_OPEN_MODAL_DELETE': 
                return { 
                    ...state,
                    addActive: false,
                    editActive: false,
                    deleteActive: true
                };
            
        default: 
            return state;
    }
}

export default taskThemeReducer;