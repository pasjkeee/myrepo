import React, {Component} from 'react';
import styled from 'styled-components';
import {Col, Row} from 'reactstrap';


const NewCol = styled(Col)`
    margin-bottom: 100px;
`

export default class RowBlock extends Component{

    render(){


        return(
            <Row>
                <NewCol md='6'>
                    {this.props.leftSide}
                </NewCol>
                <Col md='6'>
                    {this.props.rightSide}
                </Col>
            </Row>
        )
    }
}