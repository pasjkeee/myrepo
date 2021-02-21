import React, {Component} from 'react';
import ItemList from '../itemList';
import CharDetails, {Field} from '../charDetails';
import ErrorMessage from '../errorMessage';
import RowBlock from '../rowBlock';


export default class ItemsList extends Component {

    
    
    state = {
        selectedId: null,
        selectedItem: {},
        errorMsg: false
    }

    setSelectedItem = (i, item) => {
        this.setState({
            selectedId : i,
            selectedItem: item
        })
        console.log(this.state.selectedId);
    }

    componentDidCatch(){
        this.setState({
            errorMsg: true
        })
    }


    render() {

        const arr = this.props.renderFields;
        
        const elements = arr.map( (item, i) => {
            const {field, label} = item;
            
            return (
                <Field key={i+1} field={field} label={label}/>
            );
        });

        
        if(this.state.errorMsg) {
            return <ErrorMessage/>
        }

        const itemLists = (
            <ItemList onItemSelected={this.setSelectedItem}
            typeFuction={this.props.typeFynction}
            renderItem={this.props.renderItems}/>
        ) 

        const charDetail = (
            <CharDetails charId={this.state.selectedId}
            charBody={this.state.selectedItem}>

                {elements}
    
            </CharDetails>
        )

        return(
            <RowBlock leftSide={itemLists} rightSide={charDetail}/>
        )
    }

}