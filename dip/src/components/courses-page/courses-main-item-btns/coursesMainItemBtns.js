import React from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashAlt} from "@fortawesome/free-solid-svg-icons";


const ButtonGroup = styled.div`
    width: 80px;
    height: 30px;
    display: flex;
    position: absolute;
    bottom: -1px;
    right: -1px;
`

const Button = styled.button`
    height: 100%;
    width: 50%;
    background-color: #7D9FF4;
    border: 1px solid #7D9FF4;
    color: white;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    box-shadow: 0 10px 30px 0 rgba(125,159,244,0.4);

    :hover{
        background-color: rgba(95,186,233, 0.9);
        box-shadow: 0 10px 30px 0 rgba(125,159,244,0.9);
    }
`

const ButtonAdd = styled(Button)`
    height: 40px;
    width: 250px;
    border-radius: 10px 10px 10px 10px;
`

const ButtonEdit = styled(Button)`
    border-radius: 10px 0px 0px 0px;
    margin-bottom: 2px;

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

export default class CoursesMainItemBtns extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            num: this.props.num
        };
        this.OnEditClick = this.OnEditClick.bind(this);
        this.OnAddClick = this.OnAddClick.bind(this);
        this.OnDeleteClick = this.OnDeleteClick.bind(this);
        this.OnEditBtnClick = this.props.OnEditBtnClick;
    }

    OnAddClick(e){
        e.preventDefault();
    }

    OnEditClick(e){
        e.preventDefault();
        console.log(this.state.num);
        this.props.getCourse();
        this.props.OnEditBtnClick();
    }

    OnDeleteClick(e){
        e.preventDefault();
        this.props.getCourse();
        this.props.OnDeleteBtnClick();
    }

    render(){


        if(this.props.type === "edit"){
            return(

                <ButtonGroup>
                    <ButtonEdit onClick={(e)=>{this.OnEditClick(e)}}>
                        <FontAwesomeIcon icon={faPen} size="1x" color="#FFFFFF"/>
                    </ButtonEdit>
                    <ButtonDelete onClick={(e)=>{this.OnDeleteClick(e)}}>
                        <FontAwesomeIcon icon={faTrashAlt} size="1x" color="#FFFFFF"/>
                    </ButtonDelete>
                    
                </ButtonGroup>
            )
        }

        return(
                <ButtonAdd onClick={()=>{this.props.OnAddBtnClick()}}>
                    Добавить новый предмет
                </ButtonAdd>
        )
    }
}

