import React from 'react';

const SelectPosition = (props) => {
    //TODO
    return(
        <>
            <select style={{padding: "5px 10px"}}>
                <option selected value="0">Выберите нпорядковый номер темы</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
        </>
    )

}

export default SelectPosition;