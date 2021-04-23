import React, {useState} from 'react';
import styled from 'styled-components';

import {connect} from 'react-redux';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash} from "@fortawesome/free-solid-svg-icons";

import {taskThemeOpenModalAdd, taskThemeOpenModalEdit, taskThemeOpenModalDelete} from '../../../actions'

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
    background-color: #FFFFFF;
    border: 1px solid rgba(125,159,244,0.5);
    color: white;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    box-shadow: 0 10px 30px 0 rgba(125,159,244,0.4);
    opacity: 0.7;

    :hover{
        box-shadow: 0 10px 30px 0 rgba(125,159,244,0.9);
        opacity: 1;
        backgrond-color: #7D9FF4;
    }
`

const ButtonAdd = styled(Button)`
    opacity: 0.9;
    height: 40px;
    width: 250px;
    border-radius: 10px 10px 10px 10px;
    margin: 20px 0px 0px 30px;
    background-color: rgb(125, 159, 244); 
`

const ButtonEdit = styled(Button)`
    border-radius: 10px 0px 0px 0px;
    margin-bottom: 2px;
    :hover{
        opacity: 1;
        background-color: rgba(125, 159, 244, 0.9);
        box-shadow: 0 10px 30px 0 rgba(125, 159, 244, 0.9);
        border: 1px solid rgba(125,159,244,0.9);
    }
`

const ButtonDelete = styled(Button)`
    opacity: 0.5;
    border-radius: 0px 0px 10px 0px;
    background-color: #FFFFFF;
    border: 1px solid rgba(212, 0, 0, 0.5);

    :hover{
        background-color: rgba(212, 0, 0, 0.9);
        box-shadow: 0 10px 20px 0 rgba(212, 0, 0, 0.3);
    }
`

const ThemeBtns = (props) => {
    
    const [hoverDelete, setHoverDelete] = useState(false);
    const [hoverEdit, setHoverEdit] = useState(false);
    

    const OnAddClick = (e) => {
        e.preventDefault();
        console.log("hi");
        props.taskThemeOpenModalAdd();
    }

    const OnEditClick = (e) => {
        e.preventDefault();
        console.log("hi");
        props.taskThemeOpenModalEdit();
    }

    const OnDeleteClick = (e) => {
        e.preventDefault();
        props.taskThemeOpenModalDelete();
    }

    if(props.type === "edit"){
        return(
            <ButtonGroup>
                <ButtonEdit onClick={(e)=>{OnEditClick(e)}} data-type="button" onMouseOver={()=>{setHoverEdit(true)}} onMouseOut={()=>{setHoverEdit(false)}}>
                    {
                        hoverEdit ? <FontAwesomeIcon icon={faPen} color="#FFFFFF"/> : <FontAwesomeIcon icon={faPen} color="#7D9FF4" />
                    }
                </ButtonEdit>
                <ButtonDelete onClick={(e)=>{OnDeleteClick(e)}} data-type="button"  onMouseOver={()=>{setHoverDelete(true)}} onMouseOut={()=>{setHoverDelete(false)}}>
                    {
                        hoverDelete ? <FontAwesomeIcon icon={faTrash} color="#FFFFFF"/> : <FontAwesomeIcon icon={faTrash} color="#D40000"/>
                    }
                </ButtonDelete>
            </ButtonGroup>
        )
    }

    return(
            <ButtonAdd onClick={(e)=>{OnAddClick(e)}}>
                Добавить новую тему
            </ButtonAdd>
    )
}


const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = {
    taskThemeOpenModalAdd,
    taskThemeOpenModalEdit,
    taskThemeOpenModalDelete
};

export default connect(mapStateToProps, mapDispatchToProps)(ThemeBtns);