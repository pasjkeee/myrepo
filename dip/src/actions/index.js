const closeModal = () => {
    return {
        type: 'CLOSE_MODAL'
    }
}

const openModal = () => {
    return {
        type: 'OPEN_MODAL'
    }
}

const nextMonth = () => {
    return {
        type: 'NEXT_MONTH'
    }
}

const prevMonth = () => {
    return {
        type: 'PREV_MONTH'
    }
}

const toggleCal = () => {
    return {
        type: 'TOGGLE_CAL'
    }
}

const logIn = (authenticated, userId, access_lvl) => {
    return {
        type: 'LOG_IN',
        authenticated,
        userId,
        access_lvl
    }
}

const logOut = () => {
    return {
        type: 'LOG_OUT'
    }
}

const changeTasks = (taskData) => {
    return{
        type: 'CHANGE_TASKS',
        taskData: taskData
    }
}

const isMounted = () => {
    return{
        type: 'IS_MOUNTED'
    }
}

const notMounted = () => {
    return{
        type: 'NOT_MOUNTED'
    }
}

const setCurrentEditCourse = (data) => {
    return{
        type: 'SET_CURRENT_EDIT_COURSE',
        data: data
    }
}

const getTeachersData = (teachersData) => {
    return{
        type: 'GET_TEACHERS_DATA',
        teachersData: teachersData
    }
}

const coursesCloseModal = () => {
    return{
        type: 'COURSES_CLOSE_MODAL'
    }
}

const coursesOpenModalAdd = () => {
    return{
        type: 'COURSES_OPEN_MODAL_ADD'
    }
}

const coursesOpenModalEdit = () => {
    return{
        type: 'COURSES_OPEN_MODAL_EDIT'
    }
}

const coursesOpenModalDelete = () => {
    return{
        type: 'COURSES_OPEN_MODAL_DELETE'
    }
}

const coursesOpenImg = () => {
    return{
        type: 'COURSES_OPEN_IMG'
    }
}

const coursesCloseImg = () => {
    return{
        type: 'COURSES_CLOSE_IMG'
    }
}

const coursesOpenTeacherData = () => {
    return{
        type: 'COURSES_OPEN_TEACHER_DATA'
    }
}

const coursesCloseTeacherData = () => {
    return{
        type: 'COURSES_CLOSE_TEACHER_DATA'
    }
}

const addCourse = (courseTitle, courseTeacherIds, imgNum) => {
    return{
        type: 'ADD_COURSE',
        currentInfo: {
            courseId: -1,
            courseTitle,
            imgNum,
            courseTeacherIds: [...courseTeacherIds]
        }
    }
}

const editCourse = (courseId, courseTitle, imgNum, courseTeacherIds) => {
    console.log(courseId, courseTitle, imgNum, courseTeacherIds);
    const data = {
        courseId,
        courseTitle,
        imgNum,
        courseTeacherIds
    }
    return{
        type: 'EDIT_COURSE',
        currentInfo: data
    }
}

const deleteCourse = (courseId) => {
    return{
        type: 'DELETE_COURSE',
        currentInfo: {
            courseId,
            courseTitle: "",
            imgNum: -1,
            courseTeacherIds: []
        }
    }
}

const setCurrentActiveTeacher = (currentActiveTeacher) => {
    return{
        type: 'SET_CURRENT_ACTIVE_TEACHER',
        currentActiveTeacher
    }
}

export {
    closeModal,
    openModal,
    nextMonth,
    prevMonth,
    toggleCal,
    logIn,
    logOut,
    changeTasks,
    isMounted,
    notMounted,
    setCurrentEditCourse,
    getTeachersData,
    coursesCloseModal,
    coursesOpenModalAdd,
    coursesOpenModalEdit,
    coursesOpenModalDelete,
    coursesOpenImg,
    coursesCloseImg,
    coursesOpenTeacherData,
    coursesCloseTeacherData,
    addCourse,
    editCourse,
    deleteCourse,
    setCurrentActiveTeacher
};