import React from 'react';
import './search-panel.css';


export default class SearchPanel extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            text: ""
        }
        this.onValueChange = this.onValueChange.bind(this);
    }

    onValueChange(e){
        const txt = e.target.value;
        this.setState({
            text: txt
        });
        
        this.props.onSearch(txt);

    }

    

    render(){


        return (
            <input
                className="form-control search-input"
                type="text"
                placeholder="Поиск по записям"
                onChange={this.onValueChange}></input>
        )
    }
    
}
