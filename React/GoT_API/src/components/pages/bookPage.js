import React from 'react';
import GotService from '../../services/gotservice';
import ItemsList from '../itemsList';
import {Container} from 'reactstrap';

function BookPage(){

    const gotService = new GotService();

    return(
        <Container>
            <ItemsList typeFynction={gotService.getAllBooks}
                    renderItems={(item => `${item.name} (${item.region})`)}
                    renderFields={[{field: 'name', label: 'Name'}, {field: 'publisher', label: 'Publisher'}, {field: 'numberOfPages', label: 'numberOfPages'}, {field: 'released', label: 'released'}]}/>
        </Container>
    )
}

export default BookPage;