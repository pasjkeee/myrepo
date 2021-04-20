import React from 'react';
import './post-list-item.css';


export default class PostListItem extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         important: false
    //     };
    //     this.onImportant = this.onImportant.bind(this);
    // }



    render() {

        const {label, liked, important, onDelete, onLike, onImportant} = this.props;
        
        let classNames = 'app-list-item d-flex justify-content-between';
        if(important){
            classNames+=' important';
        }

        if(liked){
            classNames+=' like';
        }

        return(
            <div className={classNames}>
            <span className="app-list-item-label"
            onClick={onLike}>
                {label}
            </span>
            <div className="d-flex justify-content-center align-items-center">
                <button type="button" className="btn-star btn-sm"
                onClick={onImportant}>
                    
                    <i className="fa fa-star"></i>
                </button>
                <button type="button" className="btn-trash btn-sm"
                onClick={onDelete}>
                    <i className="far fa-trash-alt"></i>
                </button>
                <i className="fa fa-heart"></i>
            </div>
        </div>
        );
    }
}