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

export {
    closeModal,
    openModal,
    nextMonth,
    prevMonth,
    toggleCal,
    logIn,
    logOut
};