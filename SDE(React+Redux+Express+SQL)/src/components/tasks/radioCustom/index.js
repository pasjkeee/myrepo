import React from 'react';
import {connect} from 'react-redux';
import WithRestoService from '../../hoc';
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


class RadioCustom extends React.Component{


    render(){
        if(this.props.enabled){
            return(
                <Radio style={ {border: `2px solid ${this.props.color}` }}>
                    <RadioInner style={ {backgroundColor: `${this.props.color}` }}>

                    </RadioInner>
                </Radio>
            )
        }
        return(
            <Radio style={ {border: `2px solid ${this.props.color}` }}>
                
            </Radio>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        
    }
}

const mapDispatchToProps = {
    
};


export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(RadioCustom));