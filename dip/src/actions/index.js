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