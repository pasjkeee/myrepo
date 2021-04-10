import React from 'react';
import {connect} from 'react-redux';
import WithRestoService from '../../hoc';
import styled from 'styled-components';
import {nextMonth, prevMonth} from '../../../actions' 

import CalContainerItem from '../cal-container-item/calContainerItem';

import arrL from './left-arrow.svg';
import arrR from './right-arrow.svg';
import BgImg from './Calendar_SVG.svg';

const CalContainerDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Mon = styled.div`
    display: flex;
    width: 60%;
    justify-content: space-between;
    align-items: center;
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 30px;
`
const ArrL = styled.span`
    position: relative;
    z-index: 2;
    height: 20px;
    width: 20px;
    margin: 0px 10px;
    cursor: pointer;
`

const ArrR = styled.span`
    position: relative;
    z-index: 2;
    height: 20px;
    width: 20px;
    margin: 0px 10px;
    cursor: pointer;
`

const ArrImg = styled.img`
    display: block;
    max-width: 100%;
    max-height: 100%;
`

const BackImgWrapper = styled.img`
    display: inline-block;
    position: absolute;
    max-width: 5vw;
    bottom: 100px;
    right: 40px;
    opacity: .5;
`

const MyDate = styled.span`

`

const months = ["Январь", "Февраль", "Март" ,"Апрель", "Май", "Июнь", "Июль" ,"Август" ,"Сентябрь" ,"Октябрь", "Ноябрь","Декабрь"];
const digits = ["01", "02", "03" ,"04", "05", "06", "07" ,"08" ,"09" ,"10", "11","12"];


class CalContainer extends React.Component{

    constructor(){
        super();
        this.state = 
            {
                month: 0
            }
        
    }

    render(){


        return(
            <CalContainerDiv>
                    <Mon>
                        <ArrL>
                            <ArrImg src={arrL}
                            onClick={()=>{
                                this.props.prevMonth()}}/>
                        </ArrL>
                        <MyDate>
                            {`${months[this.props.envMonth]} ${this.props.envYear}`}
                        </MyDate>
                        <ArrR>
                            <ArrImg src={arrR}
                            onClick={()=>{this.props.nextMonth()}}/>
                        </ArrR>
                    </Mon>
                    <CalContainerItem month={this.props.envMonth}/>
                    <BackImgWrapper src={BgImg}/>
            </CalContainerDiv>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        envMonth: state.envMonth,
        envYear: state.envYear
    }
}

const mapDispatchToProps = {
    nextMonth,
    prevMonth
};


export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(CalContainer));