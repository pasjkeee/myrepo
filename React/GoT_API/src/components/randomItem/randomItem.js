import React, {Component} from 'react';
import RandomChar from '../randomChar';
import {Col, Row, Button} from 'reactstrap';
import styled from 'styled-components';
 
const NewRandomBlock = styled(Button)`
    margin: 20px;
`



export default class RandomItem extends Component {

    state = {
        randomBlockState: true
    }

    toggleState = () => {
        let state = this.state.randomBlockState;
        this.setState({
            randomBlockState : !state
        })
    }


    render() {

        const state = this.state.randomBlockState ? <RandomItemBlock/> : null;

        return(
            <>
                {state}
                <Row>
                    <NewRandomBlock color="primary"
                    onClick={()=>this.toggleState()}>Toggle Random</NewRandomBlock>
                </Row>
            </>
        )
    }
}


const RandomItemBlock = () => {

    return (
        
        <Row>
            <Col lg={{size: 5, offset: 0}}>
                <RandomChar/>
            </Col>
        </Row>
    )
}