import React from 'react';
import PostListItem from '../post-list-item';
import { ListGroup } from 'reactstrap';
import './post-list.css';


const PostList = ({posts, onDelete, onLike, onImportant}) => {

    const elements = posts.map( item => {
        const {id, ...itemProps} = item;
        
        return (
            <li key={id} className="list-group-item">
                <PostListItem 
                label={itemProps.label}
                important={itemProps.important}
                liked={itemProps.liked}
                onImportant={ () => onImportant(id) }
                onDelete={ () => onDelete(id) }
                onLike={ () => onLike(id) } />
            </li>
        );
    });

    return (
    // <ul className="app-list list-group">
    <ListGroup className="app-list">
        {elements}
    </ListGroup>
    //</ul>
    )
}

export default PostList;