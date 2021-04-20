import React, {Component} from 'react';


export default class ListItem extends Component{
    

    render(){
        const {userId, id, title, body} = this.props; 
        return(
            <tr>
                <th scope="row">{id}</th>
                <td>{userId}</td>
                <td>{title}</td>
                <td>{body}</td>
            </tr>
        )
    }
}