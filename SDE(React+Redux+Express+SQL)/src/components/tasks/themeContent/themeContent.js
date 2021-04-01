import React from 'react';
import styled from 'styled-components';
import WithRestoService from '../../hoc';
import {connect} from 'react-redux';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight} from "@fortawesome/free-solid-svg-icons";

import DataContentItem from '../dataContentItem';
import ThemeBtns from '../theme-btns';
import TaskBtns from '../task-btns';



const DataContentTitle = styled.div`
    position: relative;
    cursor: pointer;
    border-radius: 10px;
    border: 1px solid rgba(226, 232, 255, 0.5);
    flex-wrap: wrap;
    margin: 20px 30px;
    padding: 0px 20px;
    transition: background 0.3s ease;
    display: flex;
    align-items: center;

    &:hover{
        background: white;
        box-shadow: 0 2px 8px rgb(143 175 255 / 50%);
    }
`

const ThemeName = styled.div`
    font-size: 2rem;
    font-weight: 400;
    color: #2E3D54;;
    margin: 30px;
    font-weight: 400;
`

const DataContent = styled.div`
    border-radius: 10px;
    min-height: 100px;
    border: 1px solid rgba(226, 232, 255, 0.5);
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 30px;
    justify-items: center;
    margin: 20px 30px;
`


class ThemeContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false
        };
        this.OnActiveChange = this.OnActiveChange.bind(this);
    }

    OnActiveChange(){
        let active = !this.state.active;
        this.setState({
            active: active
        })
    }

    render(){

        if(!this.state.active){
            return(
                <DataContentTitle onClick={()=>{this.OnActiveChange()}}>
                    <FontAwesomeIcon icon={faCaretRight} size="2x" color="#2E3D54;" />
                    <ThemeName>
                        {this.props.data[0].theme}
                    </ThemeName>
                    <ThemeBtns type="edit"/>
                </DataContentTitle>
            )
        }

        console.log(this.props.filter);

        return(
            <>
                <DataContentTitle onClick={()=>{this.OnActiveChange()}}>
                <FontAwesomeIcon icon={faCaretRight} size="2x" rotation={90} color="#2E3D54;" />
                    <ThemeName>
                        {this.props.data[0].theme}
                    </ThemeName>
                    <ThemeBtns type="edit"/>
                </DataContentTitle>
                <DataContent >
                    {
                        this.props.data.map(item => {
                            return <DataContentItem key={item.task_id} data={item} filter={this.props.filter}/>
                        })
                    }
                    <TaskBtns/>
                </DataContent>
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


export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(ThemeContent));