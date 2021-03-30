import React from 'react';
import styled from 'styled-components';


const FlagContent = styled.div`

    position: absolute;
    border: 10px solid transparent; 
    border-top: 10px solid green; 
    border-right: 10px solid green;
    top: 0px;
    right: 0px;
}

`

export default class Flag extends React.Component {

    
    render() {

        const type = this.props.type;

        switch(type){
            case 'test':
            return (
                <FlagContent style={ {borderTop: `10px solid rgb(40, 214, 93)`,  borderRight: `10px solid rgb(40, 214, 93)`}}/>
            )

            case 'lection':
            return (
                <FlagContent style={ {borderTop: `10px solid rgb(254, 184, 60)`,  borderRight: `10px solid rgb(254, 184, 60)`}}/>
            )

            case 'presentation':
            return (
                <FlagContent style={ {borderTop: `10px solid rgb(191, 88, 230)`,  borderRight: `10px solid rgb(191, 88, 230)`}}/>
            )

            case 'video':
            return (
                <FlagContent style={ {borderTop: `10px solid rgb(212, 0, 0)`,  borderRight: `10px solid rgb(212, 0, 0)`}}/>
            )
       
            default: 
                return (
                    <FlagContent/>
                );
            }
    }
}