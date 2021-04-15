import React from 'react';

import styled from 'styled-components';


const Radio = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 5px;
    border: 2px solid #FEB83C;
    margin-right: 7px;
    position: relative;
`

const RadioInner = styled.div`
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: #FEB83C;
    left: 50%;
    border-radius: 2px;
    top: 50%;
    transform: translate(-50%, -50%);
`


const RadioCustom = (props) => {

        if(props.enabled){
            return(
                <Radio style={ {border: `2px solid ${props.color}` }}>
                    <RadioInner style={ {backgroundColor: `${props.color}` }}/>
                </Radio>
            )
        }

        return(
            <Radio style={ {border: `2px solid ${props.color}` }}/>
        )
}
export default RadioCustom;