import React from 'react';
import {connect} from 'react-redux';
import WithRestoService from '../../hoc';
import styled from 'styled-components';
import CoursesMainItem from '../courses-main-item';
import RestoService from '../../../services/resto-service';
import Img1 from './Asset 103.svg';
import Img2 from './Asset 104.svg';
import Img3 from './Asset 105.svg';
import Img4 from './Asset 106.svg';



class CoursesMain extends React.Component{

    constructor(props) {
        super(props);
        this.server = new RestoService();
    }

    async componentDidMount(){
        try {
            const data = await this.server.getData('/api/auth/subjects');
            console.log(data);
        } catch(e) {
            console.log(e.message);
        }
    }

    // loadInfo = async (e) => {
    //     e.preventDefault();
        
    // }

    render(){

        return(
            <>
                <CoursesMainItem
                    imgUrl = {Img1}
                    text = {"Автоматизация проектирования цифровых устройств (Лешихина И.Е., экзамен, 5ЗЕ)"}
                />
                <CoursesMainItem
                    imgUrl = {Img2}
                    text = {"Компьютерные сети (Рыбинцев В.О., экзамен, 5ЗЕ)"}
                />
                <CoursesMainItem
                    imgUrl = {Img3}
                    text = {"Микропроцессорные системы (Курдин В.А., экзамен, 5ЗЕ)"}
                />
                <CoursesMainItem
                    imgUrl = {Img4}
                    text = {"ЭВМ и периферийные устройства (Ожогин М.А., зачёт с оценкой, 4ЗЕ)"}
                />
            </>
        )
    }
}


const mapStateToProps = (state) => {


}

const mapDispatchToProps = {
    
};


export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(CoursesMain));