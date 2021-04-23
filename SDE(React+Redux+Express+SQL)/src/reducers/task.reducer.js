const initialState = {
    taskData: [],
    taskMounted: false,
    addActive: false,
    editActive: false,
    deleteActive: false,
}

function taskReducer(state = initialState, action){
    switch (action.type) {
        case 'SET_TASK_DATA':
            return { 
                ...state,
                taskData: action.taskData
            };

        case 'SET_TASK_MOUNTED':
            return {
                ...state,
                taskMounted: action.taskMounted
            }

        case 'TASK_CLOSE_MODAL':
            return { 
                    ...state,
                    addActive: false,
                    editActive: false,
                    deleteActive: false,
                }
                
        case 'TASK_OPEN_MODAL_ADD':
            return { 
                ...state,
                addActive: true,
                editActive: false,
                deleteActive: false
            };
    
        case 'TASK_OPEN_MODAL_EDIT':
            return { 
                ...state,
                addActive: false,
                editActive: true,
                deleteActive: false
            };

        case 'TASK_OPEN_MODAL_DELETE': 
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

export default taskReducer;