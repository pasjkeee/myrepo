import React, {useState} from 'react';

import styled from 'styled-components';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight} from "@fortawesome/free-solid-svg-icons";


const Wrapper = styled.div`
    display: flex;
    align-items: center;
    margin-right: 20px;
    position: relative;

    .teacher-title{
        margin-right: 20px;
        font-weight: 500;
        color: #7D9FF4;
        font-size: 18px;
    }
`

const MainContainer = styled.div`

    width: 400px;
    height: 40px;
    border: 1px solid rgba(125, 159, 244, 0.6);
    border-radius: 4px;
    display: flex;
    padding: 0px 10px;
    align-items: center;
    cursor: pointer;
    position: relative;
    margin-bottom: 10px;
    margin-left: 0px;

    &:first-child{
        margin-left: 0px;
    }

    .text{
        font-weight: 400;
        font-size: 18px;
        user-select: none;
    }
`

const TeachersContainer = styled.div`
    position: absolute;
    width: 400px;
    border: 1px solid rgba(125, 159, 244, 0.6);
    border-top: none;
    border-radius: 0px 0px 4px 4px;
    left: -2px;
    bottom: -2px;
    transform: translateY(100%);
    background-color: white;
    z-index: 1500;
    display: flex;
    flex-wrap: wrap;

    .item{
        font-weight: 400;
        font-size: 15px;
        height: 40px;
        display: flex;
        flex-wrap: wrap;
        width: 25%;
        align-items: center;
        justify-content: center;
        user-select: none;
        background-color: #FFFFFF;
        z-index: 1500;
        
        :hover{
            background-color: #E2E8FF;
            border: 1px solid #7D9FF4;

        }

    }
`

const SelectPosition = (props) => {
    //TODO
    let [active, setActive] = useState(false);
    let [choosedTeacher, setChoosedTeacher] = useState("");

    let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    const OnActive = () => {
        const newActive = !active;
        if(newActive){
            setActive(true)
        } else {
            setActive(false);
        }
    }

    const OnTeacherSet = (number) => {
        setChoosedTeacher(number);
    }

    const iconRotation = (active) ? 90 : 0;

    let defaultText = "Выберите номер темы по порядку";

    const teachersData = (active) && (
        <TeachersContainer> 
            {numbers.map(item => <div className="item" 
                                      key={item} 
                                      onClick={()=>{OnTeacherSet(item+1)}}>{item+1}
                                  </div>)} 
                                  <div className="item" 
                                      key={-1} 
                                      style={{flex: "100%", borderTop: "1px solid #7D9FF4"}}
                                      onClick={()=>{OnTeacherSet("Добавить в конец")}}>{"Добавить в конец"}
                                  </div> 
        </TeachersContainer>);

    const teacherChoosed = (choosedTeacher || choosedTeacher === 0) ? choosedTeacher : defaultText;

    const labelStyle = {
        fontSize: "14px",
        color: "#7D9FF4",
        display: "block",
        padding: "2px 6px",
        backgroundColor: "white",
        position: "absolute",
        top: "-15px",
        left: "10px"
    }

    return(
        <>
            <Wrapper>
                <MainContainer onClick={()=>{OnActive()}}>
                    <FontAwesomeIcon icon={faAngleRight} size="1x" rotation={iconRotation} color="#7D9FF4" style={{marginRight: "15px", fontSize: "20px"}}/>
                    <label htmlFor="modal-theme-select-text" style={labelStyle}>
                        Номер темы по порядку
                    </label>
                    <div className="text" id="modal-theme-select-text">
                        {teacherChoosed}
                    </div> 
                    {teachersData}
                </MainContainer>
            </Wrapper>
        </>
    )

}

export default SelectPosition;