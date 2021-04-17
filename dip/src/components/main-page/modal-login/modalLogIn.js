import React, {useState} from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faKey, faTimes } from "@fortawesome/free-solid-svg-icons";
import {closeModal, logIn, logOut, registerHandler} from '../../../actions';
import {connect} from 'react-redux';
import WithRestoService from '../../hoc';
import RestoService from '../../../services/resto-service';

const Modal = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.5);
    top: 0px;
    left: 0px;
`

const ModalDialog = styled.div`
    position: absolute;
    width: 500px;
    min-height: 500px;
    background-color: #ffffff;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 50px;
    border-radius: 8px;
`
const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
`

const Inputs = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 15px auto 15px auto;
    border-radius: 5px;
    background-color: #7D9FF4;
    transition: all 0.3s ease; 
    position: relative;
    top: 0px;
    border: 0px solid rgba(125, 159, 244, 0.1);  
`

const Log = styled.span`
    font-size: 2rem;
    position: relative;
    left:0px;
    top:0px;
    z-index: 10000;
    width: 60px;
    padding-left: 15px;
`

const Pas = styled.span`
    font-size: 2rem;
    position: relative;
    left:0px;
    top:0px;
    z-index: 10000;
    width: 60px;
    padding-left: 15px;
`

const Input = styled.input`
    box-shadow: 0 1px 10px rgb(125 159 244 / 50%);
    display: block;
    width: 350px;
    height: 50px;
    background: #fff;
    border: none;
    font-size: 18px;
    padding: 0 20px;
    outline: 0;
    position: relative;
    border-radius: 0px 5px 5px 0px;
    transition: 0.1s all ease-out;
    border-bottom: 0px solid #7D9FF4;

    :focus{
        background-color: #fff;
        border-bottom: 1px solid #7D9FF4;
    }
`

const ModalHeader = styled.div`
    font-size: 36px;
    font-weight: 700;
    margin:20px 0px 40px;
    text-align: center;
    color: #616368;
`

const ModalButton = styled.button`
    position: absolute;
    bottom: 60px;
    cursor: pointer;
    left: 49%;
    transform: translateX(-50%);
    background-color: #7D9FF4;
    border: 1px solid #7D9FF4;
    color: white;
    padding: 15px 140px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    text-transform: uppercase;
    font-size: 16px;
    box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
    border-radius: 5px 5px 5px 5px;
    margin: 5px 20px 20px 20px;
    transition: all 0.5s ease-in-out;
    font-weight: 500;

    :hover{
        color: #7D9FF4;
        background-color: #fff;
        font-weight: 700;
    }
`

const ModalClose = styled.div`
    position: absolute;
    display: inline-block;
    right: 30px;
    top: 30px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    :hover{
        transform: scale(1.2);
    }
`

const ModalLogIn = (props) => {

    let [email, setEmail] = useState("");
    let [pas, setPas] = useState("");

    const registerHandler = async (e) => {
        e.preventDefault();
        props.registerHandler(email, pas)
    }

    if(props.modalDisplay === "none"){
        return 0;
    }

    return(
        <Modal>
            <ModalDialog>
                <ModalHeader>
                    Авторизация
                </ModalHeader>
                <ModalClose onClick={()=>{props.closeModal()}} >
                    <FontAwesomeIcon icon={faTimes} size="2x" color="#7D9FF4" />
                </ModalClose>
                <Form> 
                    <Inputs>
                        <Log>
                            <FontAwesomeIcon icon={faUsers} size="xs" color="#fff" />
                        </Log>
                        <Input required placeholder="Ваш логин *"  name="login" type="text" value={email} onChange={(event) => {setEmail(event.target.value)}}/>
                    </Inputs>
                    <Inputs>
                    <Pas>
                        <FontAwesomeIcon icon={faKey} size="xs" color="#fff" />
                    </Pas>
                        <Input required placeholder="Пароль *"  name="password" type="password" value={pas} onChange={(event) => {setPas(event.target.value)}}/>
                    </Inputs>
                    <ModalButton type="submit" onClick={registerHandler}>
                        Войти
                    </ModalButton>
                </Form>
            </ModalDialog>
        </Modal>
    )
}

const mapStateToProps = (state) => {
    return {
        modalDisplay: state.login.modalDisplay
    }
}

const mapDispatchToProps = {
    closeModal,
    logIn,
    logOut,
    registerHandler
};

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(ModalLogIn));