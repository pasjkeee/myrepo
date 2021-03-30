import React from 'react';
import styled from 'styled-components';

import test from './test.svg';
import video from './video.svg';
import lection from './bookopen.svg';
import presentation from './presentation.svg';


const DataTypeCircle = styled.div`{
    min-width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid #000000;
    position: relative;

    img{
        position: absolute;
        left: 50%;
        top: 50%;
        display: inline-block;
        widht: 80%;
        height: 80%;
        transform: translate(-50%, -50%);
    }
}`

export default class TypeCircle extends React.Component{



    render() {

        const type = this.props.type;

        switch(type){
            case 'test':
            return (
                <DataTypeCircle style={ {border: `1px solid rgb(40, 214, 93)` }}>
                    <img src={test} alt="T"/>
                </DataTypeCircle>
            )

            case 'lection':
            return (
                <DataTypeCircle style={ {border: `1px solid rgb(254, 184, 60)` }}>
                    <img src={lection} alt="L"/>
                </DataTypeCircle>
            )

            case 'presentation':
            return (
                <DataTypeCircle style={ {border: `1px solid rgb(191, 88, 230)` }}>
                    <img src={presentation} alt="P"/>
                </DataTypeCircle>
            )

            case 'video':
            return (
                <DataTypeCircle style={ {border: `1px solid rgb(212, 0, 0)` }}>
                    <img src={video} alt="V"/>
                </DataTypeCircle>
            )
       
            default: 
                return (
                    <DataTypeCircle/>
                )
            }
        }
    }