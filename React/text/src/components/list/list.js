import React, {Component} from 'react';
import  {Table} from 'reactstrap';
import ListItem from '../list-item/listItem';


export default class List extends Component{

    state = {
        item: []
    }

    onUpdateList = () => {
        this.props.typeFuction()
        .then(list => {
            let arr = [];
            list.forEach((element,i) => {
                arr[i] = element
            });
            this.setState({
                item: [...arr]
            });
            this.props.addNumofItems(this.state.item.length, this.state.item);
        });
    }

    componentDidMount(){
        this.onUpdateList();
    }

    componentDidUpdate(prevProps){
        if(prevProps.newData !== this.props.newData){
            this.setState({item: this.props.newData})
        }
    }

    render(){
        
        if(this.state.item.length === 0){
            return <div>Loading</div>
        }

        return(
            <Table dark>
                <thead>
                    <tr>
                      <th>Id</th>
                      <th>UserId</th>
                      <th>Title</th>
                      <th>Body</th>
                    </tr>
                </thead>
                <tbody>
                        {
                            this.state.item.map((item,i) => {
                                if(i >= this.props.currentPage * this.props.recOnPage && i < (this.props.currentPage + 1) * this.props.recOnPage)
                                return (
                                    <ListItem key={i+1} id={item.id} userId={item.userId} title={item.title} body={item.body}></ListItem>
                                )
                            })
                        }
                </tbody>
            </Table>
        )
    }
}
