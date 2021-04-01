import React from 'react';
import {connect} from 'react-redux';
import WithRestoService from '../../hoc';
import styled from 'styled-components';

import CoursesMainItemBtns from '../courses-main-item-btns'; 

const CoursesMainItemDiv = styled.div`
    position: relative;
    border: 0.1px solid #E2E8FF;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 40px 0px;
    background-color: #FFFFFF;
    font-weight: 700;
    font-size: 1.8rem;
    padding: 20px;
    cursor: pointer;
    box-shadow: 0 2px 8px rgb(125 159 244 / 50%);
    color: #4056B9;

    .courses-text{
        display: flex;
        align-items: center;
        max-width: 80%;
    }

    :hover{
        background-color: #e1e7ff;
    }
`

const CoursesMainItemImg = styled.img`
    height: 100px;
    max-width: 120px;
    background-color: #fff;
    margin: 20px 40px;
    padding: 10px 20px;
    object-fit: cover;
    border-radius: 10px;
`

class CoursesMainItem extends React.Component{

    render(){


        return(
            <CoursesMainItemDiv>
                <div className="courses-text">
                    <CoursesMainItemImg src={this.props.imgUrl}/>
                    {this.props.text}
                </div>
                <CoursesMainItemBtns type="edit"/>
            </CoursesMainItemDiv>
        )
    }
}

const mapStateToProps = (state) => {


}

const mapDispatchToProps = {
    
};


export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(CoursesMainItem));