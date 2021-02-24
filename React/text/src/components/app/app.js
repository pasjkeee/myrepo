import React, {Component} from 'react';
import {Container, Button, Row, Col, Badge } from 'reactstrap';
import RestoService from '../../server/index';
import Nav from '../nav/nav';
import List from '../list';
import SearchPanel from '../search/search';


export default class App extends Component{

    data = new RestoService();

    constructor(props){
        super(props);
        this.state = {
            item: [],
            term: '',
            recOnPage: 10,
            numOfRecs: 0,
            numOnPages: 0,
            currentPage: 0,
            title: false,  //true - normal sort  false - reverse sort
            text: false    //true - normal sort  false - reverse sort
        }
        this.addNumofItems = this.addNumofItems.bind(this);
        this.changeCurrentPage = this.changeCurrentPage.bind(this);
        this.sortTitle = this.sortTitle.bind(this);
        this.sortText = this.sortText.bind(this);
        this.plus = this.plus.bind(this);
        this.min = this.min.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    addNumofItems(num, item) {
        this.setState({
            numOfRecs: num,
            numOnPages: Math.ceil(num/this.state.recOnPage),
            item: item
        })
    }

    changeCurrentPage(num) {
        this.setState({
            currentPage: num
        })
    }

    sortTitle(){

        let newTitle = this.state.title;
        newTitle = !newTitle;
        let newItem = [...this.state.item];

        this.setState({
            title: newTitle,
            item: newItem.sort(function(a, b){
                if(newTitle){   
                    if (a.title > b.title) {
                        return 1;
                    }
                    if (a.title < b.title) {
                        return -1;
                    }
                    return 0;
                } else {
                    if (a.title < b.title) {
                        return 1;
                    }
                    if (a.title > b.title) {
                        return -1;
                    }
                    return 0;
                }
            })
        })
    }

    sortText(){

        let newText = this.state.text;
        newText = !newText;
        let newItem = [...this.state.item];

        this.setState({
            text: newText,
            item: newItem.sort(function(a, b){
                if(newText){   
                    if (a.body > b.body) {
                        return 1;
                    }
                    if (a.body < b.body) {
                        return -1;
                    }
                    return 0;
                } else {
                    if (a.body < b.body) {
                        return 1;
                    }
                    if (a.body > b.body) {
                        return -1;
                    }
                    return 0;
                }
            })
        })
    }

    plus(){
        const newState = this.state.recOnPage + 5;
        if(newState < 50){
            this.setState({recOnPage: newState,
                           numOnPages: Math.ceil(this.state.numOfRecs/(newState))})
        }
    }

    min(){
        const newState = this.state.recOnPage;
        if(newState > 10){
            this.setState({recOnPage: newState-5,
                numOnPages: Math.ceil(this.state.numOfRecs/(newState-5))})
        }
    }

    onSearch(text){
        this.setState({
            term: text
        });
    }

    filterText(items, term){
        if(term.length === 0){
            return items
        }

        return items.filter( item => {
            const text1 = item.title;
            const text2 = term;
            return text1.toLowerCase().indexOf(text2.toLowerCase()) > -1
        })
    }

    render(){
        console.log(this.state);
        
        if(this.props.numOnPages === 0){
            return <div>Loading</div>
        }

        return(
            <Container>
                <Row>
                    <Col>
                        <h4>Кол-во записей на странице(min 10 max 50) {this.state.recOnPage} 
                        <Button onClick={()=>this.plus()}>+5</Button> <Button onClick={()=>this.min()}>-5</Button></h4>
                        <SearchPanel onSearch={this.onSearch}/>
                        <Nav 
                        numOfPages={this.state.numOnPages} 
                        clickFunk={this.changeCurrentPage} 
                        recOnPage={this.state.recOnPage} 
                        numOfRecs={this.state.numOfRecs}/> Текущая страница {this.state.currentPage+1}
                        <Button onClick={()=>this.sortTitle()}>Сортировать по заголовку</Button>
                        <Button  onClick={()=>this.sortText()}>Сортировать по тексту</Button>
                        <List 
                        typeFuction={this.data.getMenuItemsArr} 
                        addNumofItems={this.addNumofItems} 
                        currentPage={this.state.currentPage} 
                        recOnPage={this.state.recOnPage} 
                        newData={this.filterText(this.state.item, this.state.term)}/>
                    </Col>
                </Row>
            </Container>
        )
    }

}