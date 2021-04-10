import React from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashAlt, faDoorOpen, faPlusSquare} from "@fortawesome/free-solid-svg-icons";

const ButtonGroup = styled.div`
    width: 100px;
    height: 150px;
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    filter: blur(0px);
`

const Button = styled.button`
    height: 30%;
    width: 49px;
    background-color: #7D9FF4;
    border: 1px solid #7D9FF4;
    color: white;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    box-shadow: 0 10px 30px 0 rgba(125,159,244,0.4);
    filter: blur(0px);
    z-index: 1000;

    :hover{
        box-shadow: 0 10px 30px 0 rgba(125,159,244,0.9);
        filter: blur(0px);
    }
`

const ButtonAdd = styled.button`
    width: 230px;
    min-height: 300px; 
    border: 1px solid #CBCBCB;
    background-color: #FFFFFF;
    border-radius: 8px;
    margin-top: 10px;
    position: relative;
    box-shadow: 1px 1px 4px rgba(203, 203, 203, 0.7);
    cursor: pointer;
    diaplay: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.4;
        :hover{
            opacity: 0.7;
        }
`

const ButtonEnter = styled(Button)`
    border-radius: 10px 10px 0px 0px;
    height: 70%;
    width: 100px;
    margin-bottom: 1px;
    background-color: rgb(40, 214, 93);
    border: 1px solid rgb(40, 214, 93);
    box-shadow: 0 10px 30px 0 rgba(40, 214, 93,0.4);

    :hover{
        background-color: rgba(40, 214, 93, 0.9);
        box-shadow: 0 10px 30px 0 rgba(40, 214, 93,0.9);
    }

`

const ButtonEdit = styled(Button)`
    border-radius: 0px 0px 0px 10px;
    margin-right: 1px;

`

const ButtonDelete = styled(Button)`
    border-radius: 0px 0px 10px 0px;
    background-color: rgb(212, 0, 0);
    border: 1px solid rgb(212, 0, 0);
    box-shadow: 0 10px 30px 0 rgba(212, 0, 0,0.4);

    :hover{
        background-color: rgba(212, 0, 0, 0.9);
        box-shadow: 0 10px 30px 0 rgba(212, 0, 0,0.9);
    }
`

export default class TaskBtns extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            
        };
        this.OnEditClick = this.OnEditClick.bind(this);
        this.OnEnterClick = this.OnEnterClick.bind(this);
        this.OnDeleteClick = this.OnDeleteClick.bind(this);
    }

    OnEnterClick(e){
        e.preventDefault();
    }

    OnEditClick(e){
        e.preventDefault();
    }

    OnDeleteClick(e){
        e.preventDefault();
    }

    render(){

        if(this.props.type === "edit"){
            return(

                <ButtonGroup>
                    <ButtonEnter onClick={(e)=>{this.OnEditClick(e)}}>
                        <FontAwesomeIcon icon={faDoorOpen} size="2x" color="#FFFFFF" className="on-hover"/>
                    </ButtonEnter>
                    <ButtonEdit onClick={(e)=>{this.OnEditClick(e)}}>
                        <FontAwesomeIcon icon={faPen} size="1x" color="#FFFFFF" className="on-hover"/>
                    </ButtonEdit>
                    <ButtonDelete onClick={(e)=>{this.OnDeleteClick(e)}}>
                        <FontAwesomeIcon icon={faTrashAlt} size="1x" color="#FFFFFF"/>
                    </ButtonDelete>
                    
                </ButtonGroup>
            )
        }

        return(
                <ButtonAdd onClick={(e)=>{this.OnEditClick(e)}}>
                    <FontAwesomeIcon icon={faPlusSquare} size="3x" color="#7D9FF4"/>
                </ButtonAdd>
        )
    }
}
