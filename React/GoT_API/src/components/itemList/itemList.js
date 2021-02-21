import React, {Component} from 'react';
import styled from 'styled-components';
import Spinner from '../spinner';

const ListGroupItem = styled.li`
    cursor: pointer;
`
export default class ItemList extends Component {


    state = {
        item: []
    }

    onUpdateList = () => {
        this.props.typeFuction()
        .then(list => {
            this.setState({
                item: list
            });
        });
    }

    componentDidMount(){
        this.onUpdateList();
    }

    render() {

        if(this.state.item.length === 0){
            return <Spinner/>
        }

        const elements = this.state.item.map((item,i) => {

            const label = this.props.renderItem(item);

            return (
                <ListGroupItem key={i+1} className="list-group-item"
                 onClick={()=>{this.props.onItemSelected(i+1, item)}}> 
                    {label}
                </ListGroupItem >
            )
        });

        return (
            <ul className="item-list list-group">
                {elements}
            </ul>
        );
    }
}