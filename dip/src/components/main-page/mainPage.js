import React from 'react';
import NavBar from './nav-bar';

import styled from 'styled-components';
import Bg from './back.jpg';
import ModalLogIn from './modal-login';

import TaskThemeModalAdd from '../tasks/taskTehemeModals/taskThemeModalAdd';

const MainPageWrapper = styled.div`
 background: url(${Bg});
 background-repeat: no-repeat;
 background-size: cover;
 background-position: center;
`

const Container = styled.div`
    margin: 0 auto;
    width: 1140px;
    height: 100vh;
`

const MainText = styled.div`
    font-size: 18px;
    line-height: 28px;
    color: #616368;
    font-weight: 400;
    max-width: 50%;
    margin-top: 20%;

    h1{
        color: #242f51;
        font-size: 60px;
        font-weight: 700;
        margin-bottom: 40px;
    }
`

const MainPage = (props) => {

        return(
            <MainPageWrapper>
                <Container>
                    <NavBar></NavBar>
                    <MainText>
                        <h1>
                        Добро пожаловать
                        </h1>
                        В нынешнее время пандемия заставила нас всех пересесть за стационарные компьютеры. Это открыло проблему сложности передачи и донесения нужной информации до студентов.
                    </MainText>
                </Container>
                <ModalLogIn></ModalLogIn>
            </MainPageWrapper>
        )
}

export default MainPage;