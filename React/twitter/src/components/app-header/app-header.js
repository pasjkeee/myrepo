import React from 'react';
import './app-header.css';
import styled from 'styled-components';

const Header = styled.div`
display: flex;
align-items: flex-end;
justify-content: space-between;
margin-bottom: 10px;

h1{
    font-size: 26px;
    color: ${props => props.colored ? 'red' : 'black' };

    :hover{
        color: blue;
    }
}

h2{
    font-size: 1.3rem;
    color: grey;
}
`;



const AppHeader = ({liked, allPosts}) => {

    return (
        <Header as="a" colored>
            <h1>Pasha Rybkin</h1>
            <h2>{allPosts} записей, из них понравилось {liked}</h2>
        </Header>
    )
}

export default AppHeader;