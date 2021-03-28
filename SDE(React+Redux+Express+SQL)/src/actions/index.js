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
    console.log("ismount");
    return{
        type: 'IS_MOUNTED'
    }
}

const notMounted = () => {
    console.log("notmount");
    return{
        type: 'NOT_MOUNTED'
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
    notMounted
};