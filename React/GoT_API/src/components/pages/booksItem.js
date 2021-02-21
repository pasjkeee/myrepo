import React, {Component}from 'react';
import GotService from '../../services/gotservice';
import CharDetails, {Field} from '../charDetails';

export default class BooksItem extends Component {

    gotService = new GotService();

    state = {
        selectedId: 3,
        selectedItem: {name: "A Feast for Crows", numberOfPages: 784, publisher: "Bantam Books", released: "2005-11-08T00:00:00"},
        errorMsg: false
    }


    render(){

        const arr = this.props.renderFields;
        
        const elements = arr.map( (item, i) => {
            const {field, label} = item;

            
            console.log(<Field key={i+1} field={field} label={label}/>);
            
            return (
                <Field key={i+1} field={field} label={label}/>
            );
        });


        return(
            <CharDetails charId={this.props.selectedId}
            charBody={this.state.selectedItem}>

                {elements}
    
            </CharDetails>
        )
    }
}