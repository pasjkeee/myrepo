import React from 'react';
import './menu-list-item.scss';
import {connect} from 'react-redux';
import WithRestoService from '../hoc';
import {Link} from 'react-router-dom';
import {chooseItem, addIntoCart} from '../../actions';
import Error from '../error';

class MenuListItem extends React.Component {

    state = {
        error: false
    }

    componentDidCatch(){
        this.setState({error: true})
    }

    render(){

        const {title, price, url, category, id} = this.props.menuItem;


        if(this.state.error){
            return <Error/>
        }
        return(
            <>
                <li className="menu__item" onClick={()=>{this.props.chooseItem(this.props.menuItem)}}>
                    
                        <div className="menu__title">{title}</div>
                        <img className="menu__img" src={url} alt={title}></img>
                        <div className="menu__category">Category: <span>{category}</span></div>
                        <div className="menu__price">Price: <span>{price}</span></div>
                        <Link className="link_item" to={`/items/${id}`}>
                            <button className="menu__btn">Подробнее</button>
                        </Link>
                        <button className="menu__btn"
                        onClick={()=>{this.props.addIntoCart(this.props.menuItem)}}>Add to cart</button>
                </li>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        choosed: state.choosed
    }
}

const mapDispatchToProps = {
    chooseItem,
    addIntoCart
};

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(MenuListItem));