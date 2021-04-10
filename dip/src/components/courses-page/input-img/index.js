import React from 'react';
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

export default class InputImg extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            choosedIcon: 0
        };
        this.OnActive= this.OnActive.bind(this);
        this.OnChoose= this.OnChoose.bind(this);
        this.choosedIcon = this.props.getImgNum;
    }

    OnActive(){
        const active = !this.state.active;
        this.setState({
            active: active
        })
    }

    OnChoose(e){
        this.setState({
            choosedIcon: e.target.getAttribute("data-num")
        })
        this.choosedIcon(e.target.getAttribute("data-num"));
    }

    componentDidUpdate(prevProps){
        if(this.props.textTeacherActive !== prevProps.textTeacherActive && this.props.textTeacherActive === true){
            this.setState({
                active: false
            })
        }
    }



    render(){
        let icon;

        
        switch(this.state.choosedIcon){
            case "1":
                icon = <img src={Img1} alt="img" onClick={(e)=>{ this.OnChoose(e) }} data-num="1"/>;
                break;
            case "2":
                icon = <img src={Img2} alt="img" onClick={(e)=>{ this.OnChoose(e) }} data-num="2"/>;
                break;
            case "3":
                icon = <img src={Img3} alt="img" onClick={(e)=>{ this.OnChoose(e) }} data-num="3"/>;
                break;
            case "4":
                icon = <img src={Img4} alt="img" onClick={(e)=>{ this.OnChoose(e) }} data-num="4"/>;
                break;
            case "5":
                icon = <img src={Img5} alt="img" onClick={(e)=>{ this.OnChoose(e) }} data-num="5"/>;
                break;
            case "6":
                icon = <img src={Img6} alt="img" onClick={(e)=>{ this.OnChoose(e) }} data-num="6"/>;
                break;
            default:
                if(this.props.currentImgId){
                    icon = <img src={Img[this.props.currentImgId-1]} alt="img"/>;
                } else {
                    icon = <FontAwesomeIcon icon={faImages} size="3x" color="#7D9FF4"/>
                }
        }

        if(!this.state.active){
            return(
                <InputImgButton onClick={()=>{this.OnActive()}}>
                    {icon}
                </InputImgButton>
            )
        }

        let container = (!this.props.textTeacherActive) ? <div className="img-container"> { Img.map((item, i) => <img src={item} key={i} alt="img" onClick={(e)=>{ this.OnChoose(e) }} data-num={i+1}/>) } </div> : false;

        

        return(
            <>
                <InputImgButton onClick={()=>{this.OnActive()}}>
                    {icon}
                    {container}
                </InputImgButton>
            </>
        )
    }
}