const menuLoaded = (newMenu) => {
    return {
        type: 'MENU_LOADED',
        payload: newMenu
    }
}

const menuRequsted = () => {
    return {
        type: 'MENU_REQUSTED'
    }
}

const loadingError = () => {
    return {
        type: 'LOADING_ERROR'
    }
}

const chooseItem = (id) => {
    return {
        type: 'CHOOSE_ITEM',
        payload: id
    }
}

const deleteFromCart = (id) => {
    return {
        type: 'DELETE_FROM_CART',
        payload: id
    }
}

const addIntoCart = (item) => {
    return {
        type: 'ADD_INTO_CARD',
        payload: item
    }
}

export {
    menuLoaded,
    menuRequsted,
    loadingError,
    chooseItem,
    deleteFromCart,
    addIntoCart
};