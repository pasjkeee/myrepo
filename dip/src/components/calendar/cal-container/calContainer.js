import React from 'react';
import {connect} from 'react-redux';
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
const months = ["Январь", "Февраль", "Март" ,"Апрель", "Май", "Июнь", "Июль" ,"Август" ,"Сентябрь" ,"Октябрь", "Ноябрь","Декабрь"];

const CalContainer = (props) => {

    return(
        <CalContainerDiv>
                <Mon>
                    <ArrL>
                        <ArrImg src={arrL}
                        onClick={()=>{props.prevMonth()}}/>
                    </ArrL>
                    <div>
                        {`${months[props.envMonth]} ${props.envYear}`}
                    </div>
                    <ArrR>
                        <ArrImg src={arrR}
                        onClick={()=>{props.nextMonth()}}/>
                    </ArrR>
                </Mon>
                <CalContainerItem month={props.envMonth}/>
                <BackImgWrapper src={BgImg}/>
        </CalContainerDiv>
    )
}

const mapStateToProps = (state) => {
    return {
        envMonth: state.coursesPage.envMonth,
        envYear: state.coursesPage.envYear
    }
}

const mapDispatchToProps = {
    nextMonth,
    prevMonth
};


export default connect(mapStateToProps, mapDispatchToProps)(CalContainer);