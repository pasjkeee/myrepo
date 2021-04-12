

const chooseMode = (mode) => {
    return{
        type: 'CHOOSE_MODE',
        mode: mode
    }
}

const addRow = () => {
    return{
        type: 'ADD_ROW'
    }
}

const delRow = () => {
    return{
        type: 'DEL_ROW'
    }
}

const addColumn = () => {
    return{
        type: 'ADD_COLUMN'
    }
}

const delColumn = () => {
    return{
        type: 'DEL_COLUMN'
    }
}

const editTable = (i, j, a=0, b=0) => {
    return{
        type: 'EDIT_TABLE',
        i,
        j,
        a,
        b
    }
}

const removeStrongDomination = (set) => {
    return{
        type: 'REMOVE_STRONG_DOMINATION',
        set
    }
}

const removeDom = (str) => {
    return{
        type: 'REMOVE_DOM',
        str
    }
}

const randomRefilling = () => {
    return{
        type: 'RANDOM_REFILLING'
    }
}

export {
    chooseMode,
    addRow,
    delRow,
    addColumn,
    delColumn,
    editTable,
    removeStrongDomination,
    removeDom,
    randomRefilling
};