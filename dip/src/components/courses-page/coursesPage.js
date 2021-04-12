import React from 'react';
import {connect} from 'react-redux';
import WithRestoService from '../hoc';
import styled from 'styled-components';
import CoursesMain from './courses-main/coursesMain';
import {toggleCal} from '../../actions';

import BgImg from './Business_SVG.svg';

import Calendar from '../calendar'
import CoursesMainItemBtns from './courses-main-item-btns';
import CoursesMainItemModalAdd from './courses-main-item-modal-add';
import CoursesMainItemModalEdit from './courses-main-item-modal-edit';
import CoursesMainItemModalDelete from './courses-main-item-modal-delete';

const Container = styled.div`
    margin: 0 auto;
    width: 1140px;
    min-height: 100vh;
    padding-bottom: 150px;
`

const CoursesHeader = styled.div`
    padding-top: 90px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
`

const CoursesTitle = styled.div`
    font-size: 30px;
    font-weight: 700;
    color: #242f51;
`

const CoursesPageWrapper = styled.div`
    width: 100%;
    background: linear-gradient( 45deg , #FFFFFF, #E2E8FF);
    position: relative;
`

const BackImgWrapper = styled.img`
    display: inline-block;
    position: absolute;
    max-width: 15vw;
    bottom: 20px;
    left: 20px;
    opacity: .8;
`

const Burger = styled.div`
    height: 60px;
    width: 60px;
    border-radius: 50%;
    background-color: white;
    position: relative;
    cursor: pointer;
    z-index: 1005;
    transition: box-shadow ease .5s, -webkit-box-shadow ease .5s;
    border: 0.1px solid #E2E8FF;
`

const BurgerSpan = styled.span`
    :before{
        content: "";
        position: absolute;
        width: 30px;
        height: 4px;
        background-color: #7D9FF4;
        left: 15px;
        z-index: 1005;
        transform-origin: center;
        transition: bottom 0.5s ease 0.5s, transform 0.5s ease;
        bottom: 21px;
        transform: rotate(0deg);
    }
    :after{
        content: "";
        position: absolute;
        width: 30px;
        height: 4px;
        background-color: #7D9FF4;
        left: 15px;
        z-index: 1005;
        transform-origin: center;
        transition: top 0.5s ease 0.5s, transform 0.5s ease;
        top: 21px;
        transform: rotate(0deg);
    }
`

class CoursesPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            addActive: false,
            editActive: false,
            deleteActive: false
        };
        this.OnAddBtnClick = this.OnAddBtnClick.bind(this);
        this.OnEditBtnClick = this.OnEditBtnClick.bind(this);
        this.OnDeleteBtnClick = this.OnDeleteBtnClick.bind(this);
        this.OnEditCloseBtnClick = this.OnEditCloseBtnClick.bind(this);
    }

    OnAddBtnClick(){
        const active = !this.state.addActive;
        this.setState({
            addActive: active
        });
        console.log(active, "hi");
    }

    OnEditCloseBtnClick(){
        this.setState({
            editActive: false
        });
    }

    OnEditBtnClick(){
        this.setState({
            editActive: true
        });
    }

    OnDeleteBtnClick(){
        this.setState({
            deleteActive: true
        });
    }

    GetCurrenEditCourse(item){
        console.log(item);
    }

    render(){

        return(
            <CoursesPageWrapper>
                <Container>
                    <CoursesHeader>
                        <CoursesTitle>
                            Список предметов:
                        </CoursesTitle>
                        <Burger onClick={()=>{this.props.toggleCal()}}>
                            <BurgerSpan/>
                        </Burger>
                    </CoursesHeader>
                    <CoursesMain OnEditBtnClick={this.OnEditBtnClick} OnDeleteBtnClick={this.OnDeleteBtnClick}></CoursesMain>
                    <Calendar isMounted={this.props.isMounted}></Calendar>
                    <CoursesMainItemModalAdd active={this.state.addActive} OnCloseBtnClick={this.OnAddBtnClick}/>
                    <CoursesMainItemModalEdit active={this.state.editActive} OnEditCloseBtnClick={this.OnEditCloseBtnClick} GetCurrenEditCourse={this.GetCurrenEditCourse}/>
                    <CoursesMainItemModalDelete active={this.state.deleteActive} OnEditCloseBtnClick={this.OnEditCloseBtnClick} GetCurrenEditCourse={this.GetCurrenEditCourse}/>
                    <CoursesMainItemBtns OnAddBtnClick={this.OnAddBtnClick}/>
                </Container>
                <BackImgWrapper src={BgImg}></BackImgWrapper>
            </CoursesPageWrapper>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        isMounted: state.coursesPage.isMounted
    }
}

const mapDispatchToProps = {
    toggleCal
};


export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);