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

const logIn = (userId, userData) => {
    return {
        type: 'LOG_IN',
        userId: userId,
        userData: userData
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
    getTeachersData
};