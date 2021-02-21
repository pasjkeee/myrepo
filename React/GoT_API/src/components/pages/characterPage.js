import React from 'react';
import GotService from '../../services/gotservice';
import ItemsList from '../itemsList';
import {Container} from 'reactstrap';

function CharacterPage(){

    const gotService = new GotService();

    return(
        <Container>
            <ItemsList typeFynction={gotService.getAllCharacters}
                    renderItems={(item => `${item.name} (${item.gender})`)}
                    renderFields={[{field: 'name', label: 'Name'}, {field: 'gender', label: 'Gender'}, {field: 'bornDate', label: 'bornDate'}, {field: 'dieDate', label: 'dieDate'}, {field:        'culture', label: 'culture'}]}/>
        </Container>
        
    )
}

export default CharacterPage;