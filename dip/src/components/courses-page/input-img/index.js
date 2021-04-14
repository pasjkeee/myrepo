import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages} from "@fortawesome/free-solid-svg-icons";

import Img1 from '../courses-main/Asset 103.svg'
import Img2 from '../courses-main/Asset 104.svg';
import Img3 from '../courses-main/Asset 105.svg';
import Img4 from '../courses-main/Asset 106.svg';
import Img5 from '../courses-main/Asset 107.svg';
import Img6 from '../courses-main/Asset 108.svg';

const Img = [Img1, Img2, Img3, Img4, Img5, Img6];

const InputImgButton = styled.div`
    cursor: pointer;
    width: 90px;
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border: 1px solid #7D9FF4;
    position: relative;
    margin-right: 40px;

    .img-container{
        position: absolute;
        left: -20px;
        bottom: -310px;
        border: 1px solid #7D9FF4;
        border-radius: 10px;
        padding: 10px;
        display: grid;
        width: 320px;
        height: 220px;
        grid-template: 1fr 1fr / 1fr 1fr 1fr;
        grid-gap: 5px;
        background-color: #FFFFFF;
        justify-items: center;
        align-items: center;

        img{
            border: 1px solid #7D9FF4;

            :hover{
                background-color: #E2E8FF;
            }
        }
    }

    img{
        display: inline-block;
        width: 90px;
        height: 90px;
        padding: 10px;
    }
`

 const InputImg = (props) => {
     
    let [active, setActive] = useState(false);
    let [choosedIcon, setChoosedIcon] = useState(0);
    

    const OnActive = () => {
        const newActive = !active;
        setActive(newActive);
    }

    const OnChoose = (e) => {
        setChoosedIcon(e.target.getAttribute("data-num"));
    }

    useEffect(()=>{
        setChoosedIcon(props.getImgNum);
        if(props.textTeacherActive === true){
            setActive(false);
        }

    },[props.textTeacherActive, props.getImgNum]);

    let icon

    if(choosedIcon > 0 || choosedIcon < 7){
        icon = <img src={Img[choosedIcon-1]} alt="img" onClick={(e)=>{ OnChoose(e) }} data-num={choosedIcon}/>;
    } else if(props.currentImgId){
        icon = <img src={Img[props.currentImgId-1]} alt="img"/>;
    } else {
        icon = <FontAwesomeIcon icon={faImages} size="3x" color="#7D9FF4"/>
    }

    if(!active){
        return(
            <InputImgButton onClick={()=>{OnActive()}}>
                {icon}
            </InputImgButton>
        )
    }

    let container = (!props.textTeacherActive) ? <div className="img-container"> { Img.map((item, i) => <img src={item} key={i} alt="img" onClick={(e)=>{ OnChoose(e) }} data-num={i+1}/>) } </div> : false;

    return(
        <>
            <InputImgButton onClick={()=>{OnActive()}}>
                {icon}
                {container}
            </InputImgButton>
        </>
    )
}

export default InputImg;