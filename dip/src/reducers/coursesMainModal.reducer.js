
const initialState = {
    addActive: false,
    editActive: false,
    deleteActive: false,
    teacherDataActive: false,
    imgActive: false,
    currentInfo: {
        courseId: -1,
        courseTitle: "",
        imgNum: -1,
        courseTeacherIds: []
    }
}

function coursesMainModalReducer(state = initialState, action){
    switch (action.type) {
        case 'COURSES_CLOSE_MODAL':
            return { 
                ...state,
                addActive: false,
                editActive: false,
                deleteActive: false,
                teacherDataActive: false,
                imgActive: false
            };
        case 'COURSES_OPEN_MODAL_ADD':
            return { 
                ...state,
                addActive: true,
                editActive: false,
                deleteActive: false
            };

        case 'COURSES_OPEN_MODAL_EDIT':
            return { 
                ...state,
                addActive: false,
                editActive: true,
                deleteActive: false
            };
        case 'COURSES_OPEN_MODAL_DELETE': 
            return { 
                ...state,
                addActive: false,
                editActive: false,
                deleteActive: true
            };

        case 'COURSES_OPEN_IMG': 
            return { 
                ...state,
                teacherDataActive: false,
                imgActive: true
            };

        case 'COURSES_CLOSE_IMG': 
            return { 
                ...state,
                imgActive: false
            };

        case 'COURSES_OPEN_TEACHER_DATA': 
            return { 
                ...state,
                teacherDataActive: true,
                imgActive: false
            };

        case 'COURSES_CLOSE_TEACHER_DATA': 
            return { 
                ...state,
                teacherDataActive: false
            };

        case 'ADD_COURSE':
            return { 
                ...state,
                currentInfo: action.currentInfo
            };

        case 'EDIT_COURSE':
            return { 
                ...state,
                currentInfo: action.currentInfo
            };
        
        case 'DELETE_COURSE':
            return { 
                ...state,
                currentInfo: action.currentInfo
            };

        default: 
            return state;
    }
}

export default coursesMainModalReducer;