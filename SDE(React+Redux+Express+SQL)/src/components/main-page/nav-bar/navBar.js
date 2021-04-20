import React from 'react';
import styled from 'styled-components';
import {openModal} from '../../../actions';
import {connect} from 'react-redux';
import WithRestoService from '../../hoc';

const NavBarContainer = styled.div`
    width: 100%;
    height: 140px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const NavBarLogo = styled.a`
    font-size: 60px;
    font-weight: 900;
    text-decoration: none;
    color: #D7271F;
`

const NavBarList = styled.ul`
    display: flex;
    list-style-type: none;
    margin-right: 10%;
`

const NavBarListItem = styled.li` 
    padding: 0px 25px;
    vertical-align: center;
    transition: all 0.5s ease;

    :hover{
        transform: scale(1);
    }
`

const NavBarListLink = styled.a` 
    text-decoration: none;
    font-size: 20px;
    font-weight: 500;
    color: #242f51;
    position: relative;
    display: inline-block;

    :before{
        content: "";
        width: 0px;
        height: 2px;
        background-color: #242f51;
        position: absolute;
        bottom: 0px;
        transition: all 0.5s ease;
    }

    :hover{
        :before{
            width: 100%;
        }
    }
`
const NavBarListLogIn = styled.a` 
    font-size: 20px;
    text-decoration: none;
    background-color: #7D9FF4;
    padding: 7px 50px;
    color: #ffffff;
    font-weight: 700;
    border: 1px solid #7D9FF4;
    transition: all 0.5s ease;
    cursor: pointer;

    :hover{
        background-color: #ffffff;
        color: #7D9FF4;
    }

`

const NavBar = (props) => {

    return(
        <NavBarContainer>
            <NavBarLogo href="#" >
                МЭИ
            </NavBarLogo>
            <NavBarList>
                <NavBarListItem>
                    <NavBarListLink href="#" >Новости</NavBarListLink>
                </NavBarListItem>
                <NavBarListItem>
                    <NavBarListLink href="#" >О нас</NavBarListLink>
                </NavBarListItem>
                <NavBarListItem>
                    <NavBarListLink href="#" >Обратная связь</NavBarListLink>
                </NavBarListItem>
                <NavBarListItem>
                    <NavBarListLogIn onClick={()=>{props.openModal()}} >Войти</NavBarListLogIn>
                </NavBarListItem>
            </NavBarList>
        </NavBarContainer>
    )
}

const mapDispatchToProps = {
    openModal
};

export default connect(null, mapDispatchToProps)(NavBar);