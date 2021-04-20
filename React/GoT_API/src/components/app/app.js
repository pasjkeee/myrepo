import React, {Component}from 'react';
import {Container} from 'reactstrap';
import Header from '../header';
import RandomItem from '../randomItem';
import {CharacterPage, BookPage, HousePage, BooksItem} from '../pages';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './index.css';





export default class App extends Component{


    render(){

        return(
            <Router> 
                <div className="app">
                <Container>
                    <Header />
                </Container>
                <Container>
                    <RandomItem renderFields={[{field: 'name', label: 'Name'}, {field: 'gender', label: 'Gender'}, {field: 'bornDate', label: 'bornDate'}, {field: 'dieDate', label: 'dieDate'}, {field: 'culture', label: 'culture'}]}/>
                </Container>
                <Route path='/characters' exact component={CharacterPage}/>
                <Route path='/houses' exact component={HousePage}/>
                <Route path='/books' exact component={BookPage}/>
                <Route path='/books/:id' exact render={ 
                    ({match}) => {
                        const{id} = match.params;

                        return <BooksItem selectedId={id} renderFields={[{field: 'name', label: 'Name'}, {field: 'publisher', label: 'Publisher'}, {field: 'numberOfPages', label: 'numberOfPages'}, {field: 'released', label: 'released'}]}/>
                    }
                }/>
                </div>
            </Router>
        )
    }
}
