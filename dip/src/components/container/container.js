import React, {Component} from 'react';

import styled from 'styled-components';

const ContainerDiv = styled.div`
    width: 1140px;
    margin: 0 auto;
    min-height: 100vh;
` 

export default class Container extends Component {


    render(){
        return <ContainerDiv></ContainerDiv>
    }
}