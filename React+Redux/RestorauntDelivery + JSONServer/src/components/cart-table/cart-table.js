import React from 'react';
import './cart-table.scss';
import {connect} from 'react-redux';
import WithRestoService from '../hoc';
import {deleteFromCart} from '../../actions';

class CartTable extends React.Component {

    

    render(){

        return (
            <>
                <div className="cart__title">Ваш заказ:</div>
                <div className="cart__list">

                    {
                        this.props.cartItems.map(item => {
                            const {url, title, price, id} = item;
                            return(
                                <div className="cart__item" key={id + new Date()}>
                                    <img src={url} className="cart__item-img" alt={title}></img>
                                    <div className="cart__item-title">{title}</div>
                                    <div className="cart__item-price">{price}$</div>
                                    <div className="cart__close"
                                    onClick={()=>{this.props.deleteFromCart(id)}}>&times;</div>
                                </div>
                            )
                        })
                    }
                    
                </div>
            </>
        );
    }
    
};

const mapStateToProps = (state) => {
    return {
        cartItems: state.cartItems
    }
}

const mapDispatchToProps = {
    deleteFromCart 
};

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(CartTable));