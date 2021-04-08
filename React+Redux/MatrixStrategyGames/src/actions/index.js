

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

export {
    chooseMode,
    addRow,
    delRow,
    addColumn,
    delColumn,
    editTable
};