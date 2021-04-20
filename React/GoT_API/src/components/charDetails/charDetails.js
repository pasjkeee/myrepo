import React, {Component} from 'react';
import styled from 'styled-components';
import GotService from '../../services/gotservice';

const CharDetailsDiv = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
`
const CharDetailsHeader = styled.h4`
    margin-bottom: 20px;
    text-align: center;
`
const SelectorError = styled.div`
    color: #fff;
    text-align: center;
    font-size: 26px;
`

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {Field};

export default class CharDetails extends Component {

    gotService = new GotService();

    state = {
        item: {},
        id: ''
    }

    onCharLoaded() {

        if(this.props.charId === null){
            return;
        }
        
        //const {name, gender, bornDate, dieDate, culture} = this.props.charBody;
        this.setState({
            item: this.props.charBody,
            id: this.props.charId
        });
    }

    componentDidMount(){
        this.onCharLoaded();
    }

    componentDidUpdate(prevProps){
        if(this.props.charId !== prevProps.charId){
            this.onCharLoaded();
        }
    }

    render() {

        const  {item} = this.state;
        const  {name} = {item};

        console.log(name, item);

        if(!this.state.id){
            return <SelectorError>Choose your fighter</SelectorError>
        }

        return (
            <CharDetailsDiv className="rounded">
                <CharDetailsHeader>{item.name}</CharDetailsHeader>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child)=> {
                            return React.cloneElement(child, {item});
                        })
                    }
                </ul>
            </CharDetailsDiv>
        );
    }
}