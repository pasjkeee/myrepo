import React from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';
import './app.css';

import styled from 'styled-components';

const AppBlock = styled.div`
    margin: 0 auto;
    max-width: 800px;
`;



// const StyledAppBlock = styled(AppBlock)`
//     color: red;
// `;

const data = [
    {label:"Going to learn React", important: true, liked: false, id:1},
    {label:"That is so good", important: true, liked: false, id:2},
    {label:"I need a break..", important: false, liked: true, id:3},
    {label:"Going to learn React", important: false, liked: false, id:4},
];

const newData = data.filter(item => {
    if(typeof(item) === "object"){
        return item;
    }
});

// const allCount = newData.length;  
// const likeCount = newData.filter(item => item.liked).length;  



export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data : newData,
            term: '',
            filter: 'all'
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.likeItem = this.likeItem.bind(this);
        this.importantItem = this.importantItem.bind(this);
        this.setTerm = this.setTerm.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);
        this.maxId = 5;
        
    }

    deleteItem(id){
        this.setState(({data}) => {
            const index = data.findIndex( elem => elem.id === id );

            const before = data.slice(0, index);
            const after = data.slice(index+1);

            const newArr = [...before, ...after];
            return{
                data: newArr
            }
        });

    }

    addItem(body){
        this.setState(({data}) => {
            let newItem = {
                label: body,
                important: false,
                liked: false,
                id: this.maxId++
            }
            
            return{
                data: [...data, newItem]
            }
        });

    }

    likeItem(id){
        this.setState(({data}) => {
            const index = data.findIndex( elem => elem.id === id );
            const newData = data.slice(0);
            newData[index].liked = !newData[index].liked;
            return{
                data: [...newData]
            }
        });

    }

    importantItem(id){
        this.setState(({data}) => {
            const index = data.findIndex( elem => elem.id === id );
            const newData = data.slice(0);
            newData[index].important = !newData[index].important;
            return{
                data: [...newData]
            }
        });
    }

    setTerm(text){
        this.setState({
            term: text
        });
    }

    filterText(items, term){
        if(term.length === 0){
            return items
        }

        return items.filter( item => {
            const text1 = item.label;
            const text2 = term;
            return text1.toLowerCase().indexOf(text2.toLowerCase()) > -1
        })
    }

    filterPosts(items, filter) {
        if(filter === 'liked') {
            return items.filter(item => item.liked)
        } else {
            return items;
        }
    }

    onFilterSelect(fil) {
        this.setState({filter: fil})
    }

    

    render(){

        const {term, data, filter} = this.state;
        
        const liked = this.state.data.filter(item => item.liked).length;
        const allPosts = this.state.data.length;

        const visiblePosts = this.filterPosts(this.filterText(data, term), filter);

        return(
            <AppBlock>
                <AppHeader liked={liked} allPosts={allPosts}/>
                <div className="searc-panel d-flex">
                    <SearchPanel onSearch={this.setTerm}/>
                    <PostStatusFilter
                    filter={filter}
                    onFilterSelect={this.onFilterSelect}/>
                </div>
                <PostList posts={visiblePosts}
                          onDelete={ this.deleteItem }
                          onLike={this.likeItem}
                          onImportant={this.importantItem}/>
                <PostAddForm
                          onAdd={ this.addItem }/>
            </AppBlock>
            );
    }
    
}
