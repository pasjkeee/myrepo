import React from 'react';
import styled from 'styled-components';


const FlagContent = styled.div`
    position: absolute;
    border: 10px solid transparent; 
    top: 0px;
    left: 0px;
}

`

const Flag  = (props) => {

    const subjId = props.subjId;

    switch(subjId%6){
        case 0:
        return <FlagContent style={ {borderTop: `10px solid #8D9BDC`,  borderLeft: `10px solid #8D9BDC`}}/> 
        case 1:
        return  <FlagContent style={ {borderTop: `10px solid #663DB9`,  borderLeft: `10px solid #663DB9`}}/> 
        case 2:
        return <FlagContent style={ {borderTop: `10px solid #FFE541`,  borderLeft: `10px solid #FFE541`}}/> 
        case 3:
        return  <FlagContent style={ {borderTop: `10px solid #8D9BDC`,  borderLeft: `10px solid #8D9BDC`}}/> 
        case 4:
        return  <FlagContent style={ {borderTop: `10px solid #A65F15`,  borderLeft: `10px solid #A65F15`}}/> 
        case 5:
        return  <FlagContent style={ {borderTop: `10px solid #318EAC`,  borderLeft: `10px solid #318EAC`}}/> 
    
        default: 
            return false 
        }
}

export default Flag;