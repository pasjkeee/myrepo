import React from 'react';
import GotService from '../../services/gotservice';
import ItemsList from '../itemsList';
import {Container} from 'reactstrap';

function HousePage(){

    const gotService = new GotService();

    return(
    <Container>
        <ItemsList typeFynction={gotService.getAllHouses}
                    renderItems={(item => `${item.name} (${item.numberOfPages})`)}
                    renderFields={[{field: 'name', label: 'Name'}, {field: 'region', label: 'Region'}, {field: 'words', label: 'Words'}, {field: 'titles', label: 'titles'}, {field: 'overlord', label: 'overlord'}, {field: 'ancestralWeapons', label: 'ancestralWeapons'}]}/>
    </Container>
    )
}

export default HousePage;