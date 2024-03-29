//loginReducer
import RestoService from '../services/resto-service';

export const closeModal = () =>  ({ type: 'CLOSE_MODAL' })
export const openModal = () => ({  type: 'OPEN_MODAL'})

export const logIn = (authenticated, userId, access_lvl) => ({
    type: 'LOG_IN',
    authenticated,
    userId,
    access_lvl
})
export const logOut = () => ({ type: 'LOG_OUT' })
export const setAuthorized = (auth) => ({ type: 'SET_AUTHORIZED', auth})


//coursesPageReducer
export const nextMonth = () => ({ type: 'NEXT_MONTH'})
export const prevMonth = () => ({type: 'PREV_MONTH'})
        
export const toggleCal = () => ({ type: 'TOGGLE_CAL' })

export const changeTasks = (taskData) => ({
        type: 'CHANGE_TASKS',
        taskData
    })
export const isMounted = () => ({ type: 'IS_MOUNTED' })
export const notMounted = () => ({ type: 'NOT_MOUNTED' })

export const setCurrentEditCourse = (data) => ({
        type: 'SET_CURRENT_EDIT_COURSE',
        data
    })

export const getTeachersData = (teachersData) => ({
    type: 'GET_TEACHERS_DATA',
    teachersData
})

export const setCoursesData = (coursesData) => ({
    type: 'SET_COURSES_DATA',
    coursesData
})

export const addNewCourse = (coursesData) => ({
    type: 'ADD_NEW_COURSE',
    coursesData
})

export const setSelectedId = (selectedId) => ({
    type: 'SET_SELECTED_ID',
    selectedId
})

export const removeSelectedId = (selectedId) => ({
    type: 'REMOVE_SELECTED_ID',
    selectedId
})

//coursesMainModalReducer
export const coursesCloseModal = () => ({ type: 'COURSES_CLOSE_MODAL' });
export const coursesOpenModalAdd = () => ({ type: 'COURSES_OPEN_MODAL_ADD' });
export const coursesOpenModalEdit = () => ({ type: 'COURSES_OPEN_MODAL_EDIT' });
export const coursesOpenModalDelete = () => ({ type: 'COURSES_OPEN_MODAL_DELETE'});
export const coursesOpenImg = () => ({ type: 'COURSES_OPEN_IMG' });
export const coursesCloseImg = () => ({ type: 'COURSES_CLOSE_IMG' });
export const coursesOpenTeacherData = () => ({ type: 'COURSES_OPEN_TEACHER_DATA' });
export const coursesCloseTeacherData = () => ({ type: 'COURSES_CLOSE_TEACHER_DATA' });
export const addCourse = (courseTitle, courseTeacherIds, imgNum) => ({
    type: 'ADD_COURSE',
        currentInfo: {
            courseId: -1,
            courseTitle,
            imgNum,
            courseTeacherIds: [...courseTeacherIds]
        }
});

export const editCourse = (courseId, courseTitle, imgNum, courseTeacherIds) => ({
        type: 'EDIT_COURSE',
        currentInfo: {
            courseId,
            courseTitle,
            imgNum,
            courseTeacherIds
        }
});

export const deleteCourse = (courseId) => ({
        type: 'DELETE_COURSE',
        currentInfo: {
            courseId,
            courseTitle: "",
            imgNum: -1,
            courseTeacherIds: []
        }
});

export const setCurrentActiveTeacher = (currentActiveTeacher) => ({
        type: 'SET_CURRENT_ACTIVE_TEACHER',
        currentActiveTeacher
});


//taskThemeReducer

export const setTaskThemeData = (taskThemeData) => ({ type: 'SET_TASK_THEME_DATA', taskThemeData });
export const setTaskThemeMounted = (taskThemeMounted) => ({type: 'SET_TASK_THEME_MOUNTED', taskThemeMounted })

export const taskThemeCloseModal = () => ({ type: 'TASK_THEME_CLOSE_MODAL' });
export const taskThemeOpenModalAdd = () => ({ type: 'TASK_THEME_OPEN_MODAL_ADD' });
export const taskThemeOpenModalEdit = () => ({ type: 'TASK_THEME_OPEN_MODAL_EDIT' });
export const taskThemeOpenModalDelete = () => ({ type: 'TASK_THEME_OPEN_MODAL_DELETE'});

//taskReducer

export const setTaskData = (taskData) => ({ type: 'SET_TASK_DATA', taskData });
export const setTaskMounted = (taskMounted) => ({type: 'SET_TASK_MOUNTED', taskMounted })

export const taskCloseModal = () => ({ type: 'TASK_CLOSE_MODAL' });
export const taskOpenModalAdd = () => ({ type: 'TASK_OPEN_MODAL_ADD' });
export const taskOpenModalEdit = () => ({ type: 'TASK_OPEN_MODAL_EDIT' });
export const taskOpenModalDelete = () => ({ type: 'TASK_OPEN_MODAL_DELETE'});

//Thunk

export const getCoursesMainData = () => {

    return async (dispatch) => {

        const server = new RestoService();
        const data = await server.getData('/api/auth/subjects');

        const teachersData = data.teachers.map(item => {
            return {
                teacher_id: item.teacher_id,
                teacher: `${item.first_name} ${item.last_name[0]}.${item.patronymic[0]}.`
            }
        });

        dispatch(setCoursesData(data.subjects));
        dispatch(getTeachersData(teachersData));
        dispatch(changeTasks(data.tasks));
        dispatch(isMounted());
    }
}

export const registerHandler = (email, pas) => {

    return async (dispatch) => {

        const server = new RestoService();
        const data = await server.getData('/api/auth/login', 'POST', {email, pas});

        dispatch(logIn(data.authenticated, data.userId, data.access_lvl));
    }
}

export const getTaskThemeData = (numPath) => {

    return async (dispatch) => {

        dispatch(setTaskThemeMounted(false))

        const server = new RestoService();
        const data = await server.getData(`/api/tasks/tasks?subjId=${numPath}`);

        console.log(data, "lol");

        dispatch(setTaskThemeData(data));
        dispatch(setTaskThemeMounted(true))
    }
}

export const getAuthenticated = () => {

    return async (dispatch) => {

        const server = new RestoService();
        const data = await server.getData(`/api/auth/getAuthenticated`);
        if(data?.authenticated === true){
            dispatch(setAuthorized(true));
        } else {
            dispatch(setAuthorized(false));
        }
    }
}

export const addNewCourseToDatabase = (text, imgNum, teachersId) => {

    return async (dispatch) => {

        const server = new RestoService();
        const data = await server.getData('/api/postsubject', 'POST', {text, imgNum, teachersId});

    }
}

export const editCourseInDatabase = (text, imgNum, teachersId, subject_id) => {

    return async (dispatch) => {

        const server = new RestoService();
        const data = await server.getData('/api/editsubject', 'PUT', {text, imgNum, teachersId, subject_id});

    }
}

export const deleteCourseFromDatabase = (subjectId) => {

    return async (dispatch) => {

        const server = new RestoService();
        const data = await server.getData('/api/deletesubject', 'DELETE', {subject_id: subjectId});
        
    }

}