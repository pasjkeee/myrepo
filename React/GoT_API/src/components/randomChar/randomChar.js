import React, {Component} from 'react';
import styled from 'styled-components';
import GotService from '../../services/gotservice';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';



const RandomBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
`

const RandomBlockHeader = styled.h4`
    margin-bottom: 20px;
    text-align: center;
`

const Term = styled.h4`
    font-weight: bold;
`

export default class RandomChar extends Component {

    gotService = new GotService();

    constructor() {
        super();
        this.updateChar = this.updateChar.bind(this);
        this.onCharLoaded = this.onCharLoaded.bind(this);
        
    }

    state = {
        name: '',
        gender: '',
        bornDate: '',
        dieDate: '',
        culture: '',
        id: 13,
        loading: true,
        error: false
    }

    componentDidMount(){
        this.updateChar();
        this.timer = setInterval(this.updateChar, 5000);
    }

    componentWillUnmount(){
        clearInterval(this.timer);
    }

    onCharLoaded(char) {

        this.setState({
            name : char.name ? char.name : "No info",
            gender: char.gender ? char.gender : "No info",
            bornDate: char.bornDate ? char.bornDate : "No info",
            dieDate: char.dieDate ? char.dieDate : "No info",
            culture: char.culture ? char.culture : "No info",
            loading: false
        });
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    updateChar() {
        this.gotService.getCharacter(this.state.id)
            .then(char => {
                this.onCharLoaded(char);
                this.setState({
                    id: (Math.floor(Math.random() * (0 - 300 + 1)) + 300)
                })
        })
        .catch(this.onError);
    }


    render() {

        const load = this.state.loading ? <Spinner/> : null;
        const content = !(this.state.loading || this.state.error) ? <View state={this.state}/> : null;
        const errorMsg = this.state.error ? <ErrorMessage/> : null;

        return (
            <RandomBlock className="rounded">
                {load}
                {content}
                {errorMsg}
            </RandomBlock>
        );
    }
}

const View = ({state}) => {
    return (
        <>
        <RandomBlockHeader>{state.name}</RandomBlockHeader>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <Term>Gender </Term>
                    <span>{state.gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <Term>Born </Term>
                    <span>{state.bornDate}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <Term>Died </Term>
                    <span>{state.dieDate}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <Term>Culture </Term>
                    <span>{state.culture}</span>
                </li>
            </ul>
        </>
    )
};