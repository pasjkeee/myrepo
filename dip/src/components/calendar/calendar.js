import React from 'react';
import {connect} from 'react-redux';
import WithRestoService from '../hoc';
import styled from 'styled-components';

import CalContainer from './cal-container';
import CalTasks from './cal-tasks';


const Cal = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
    min-height: 800px;
    width: 1240px;
    font-family: 'Montserrat', sans-serif;
    position: absolute;
    z-index: 20;
    top: 0px;
    background: linear-gradient( -45deg, white, #f3f6ff);
    transition: transform 1s ease;
    transform: translate(-50%, 0%);
    left: 50%;
    box-shadow: 2px 2px 5px rgb(125 159 244 / 30%);
`

const CalWrapper = styled.div`
    width: 1140px;
    display: flex;
    justify-content: space-between;
    height: 100%;
`

class Calendar extends React.Component{

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            datas: {}
        }
    }

    componentDidMount(){
        if(this.props.isMounted === true){
            const datas = this.props.obj.map(data => {
                const date = data.date.split('.');
                const endDate = data.end_date.split('.');
                date[0] = +date[0]; date[1] = +date[1]; endDate[0] = +endDate[0]; endDate[1] = +endDate[1];
                return{
                    date,
                    endDate
                }
            });
            this.setState({
                datas: datas
            });
        }
    }

        componentDidUpdate(prevProps){
        if(prevProps.isMounted !== this.props.isMounted){
            const datas = this.props.obj.map(data => {
                const date = data.date.split('.');
                const endDate = data.end_date.split('.');
                date[0] = +date[0]; date[1] = +date[1]; endDate[0] = +endDate[0]; endDate[1] = +endDate[1];
                return{
                    date,
                    endDate
                }
            });
            this.setState({
                datas: datas
            });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render(){

            

        let calDisplay = {
            transform: ((this.props.calDisplay) ? "translate(-50%, 0%)" : "translate(-50%, -150%)")
        }

        return (
                <Cal style={calDisplay}>
                    <CalWrapper>
                        <CalTasks date={this.props.obj}></CalTasks>
                        <CalContainer date={this.state.datas} mounted={this.props.isMounted}></CalContainer>
                    </CalWrapper>
                </Cal>
            )
    }

}


const mapStateToProps = (state) => {
    return {
        calDisplay: state.calDisplay,
        obj: state.obj,
        isMounted: state.isMounted
    }
}

const mapDispatchToProps = {
    
};


export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(Calendar));