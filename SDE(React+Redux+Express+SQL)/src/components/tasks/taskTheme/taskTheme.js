import React from 'react';
import styled from 'styled-components';
import WithRestoService from '../../hoc';
import {connect} from 'react-redux';
import RadioCustom from '../radioCustom';
import ThemeContent from '../themeContent';

import RestoService from '../../../services/resto-service';


const DataFilter = styled.div`
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #CACACA;
    display: flex;
    justify-content: center;
    background-color: #f3f6ff;

    form{
        display: flex;
        align-items: center;
        margin-left: 30px;

        label{
            margin-right: 20px;
            display: flex;
            align-items: center;
            font-size: 18px;
            cursor: pointer;
            font-weight: 300;

            input{
                margin-right: 7px;
                display: none;
            }
        }
    }
`


class TasksTheme extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            toggle: false,
            currentFiletr: "all",
            enabled: [true, false, false, false, false],
            data: []
        };
        this.server = new RestoService();
        this.changeFilter = this.changeFilter.bind(this);
    }

    async componentDidMount(){

        try {
            console.log(this.props.subjId);
        const data = await this.server.getData(`/api/tasks/tasks?subjId=${this.props.subjId.courseId}`);
        this.setState({
            data: data
        })

        } catch(e) {
            console.log(e.message);
        }
    }


    changeFilter(e){
        let currentNum = [false, false, false, false, false];
        if(e.target.name){

            switch(e.target.name){
                case 'lection':
                    currentNum[1] = true;
                    break;
                case 'test':
                    currentNum[2] = true;
                    break;
                case 'presentation':
                    currentNum[3] = true;
                    break;
                case 'video':
                    currentNum[4] = true;
                    break;
                default: 
                    currentNum[0] = true;
                    break;
            }

            this.setState({
                currentFiletr: e.target.name,
                enabled: currentNum
            })
        }
    }

    render(){
        let newSet = new Set();
        let newObj = {};
        for(let i=0; i<this.state.data.length; i++){
            if(!newSet.has(this.state.data[i].theme_id)){
                newSet.add(this.state.data[i].theme_id)
                newObj[`${this.state.data[i].theme_id}`] = [];
            }
            newObj[`${this.state.data[i].theme_id}`].push(this.state.data[i]);
        }
        newSet = [...newSet];

        return(
            <>   
                <DataFilter>
                    <form>
                        <label onClick={(e)=>{this.changeFilter(e)}}>
                            <RadioCustom color="#ABAEB3" enabled={this.state.enabled[0]}/>
                             <input name="all" type="radio" /> Все
                        </label>
                        <label onClick={(e)=>{this.changeFilter(e)}}>
                            <RadioCustom color="#FEB83C" enabled={this.state.enabled[1]}/>
                            <input name="lection" type="radio" /> Лекции
                        </label>
                        <label onClick={(e)=>{this.changeFilter(e)}}>
                            <RadioCustom color="#28D65D" enabled={this.state.enabled[2]}/>
                            <input name="test" type="radio" /> Тесты
                        </label>
                        <label onClick={(e)=>{this.changeFilter(e)}}>
                            <RadioCustom color="#BF58E6" enabled={this.state.enabled[3]}/>
                            <input name="presentation" type="radio" /> Презентации
                        </label>
                        <label onClick={(e)=>{this.changeFilter(e)}}>
                            <RadioCustom color="#D40000" enabled={this.state.enabled[4]}/>
                            <input name="video" type="radio" /> Видеo
                        </label>
                    </form>
                </DataFilter>
                {
                    newSet.map(item => {
                        return <ThemeContent key={item} data={newObj[item]} filter={this.state.currentFiletr}/>
                    })
                }
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = {
};

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(TasksTheme));