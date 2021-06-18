//check routes and filenames

import React from "react";
import { Link } from "react-router-dom";
import {addToCart, removeFromCart} from '../store/orders'
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
class EachProduct extends React.Component{
    constructor(){
        super()
        this.handleAdd = this.handleAdd.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
    }
    handleAdd(evt){
        evt.preventDefault();
        const orderId = 1;
        const productId = evt.target.value;
        this.props.addItem(orderId,productId);
    }
    handleRemove(evt){
        evt.preventDefault();
        const orderId = 1;
        const productId = evt.target.value;
        this.props.removeItem(orderId,productId);
    }
    render(){
        const product = this.props.product;
    return (
        <div className="listViewDiv">
            <div id="picListView">
                <img
                    className="product__image"
                    src={product.imageURL}
                    alt="product"
                />
            </div>
            <div className="listViewDiv namePrice">
                <div className="product__name">
                    <Link to={`/products/${product.id}`}>
                        <h3>{product.name}</h3>
                    </Link>
                </div>

                <div className="product__price">
                    <h4>${product.price}</h4>
                </div>
                {/* <div className="cart__btn">
                    <button value = {product.id} onClick={this.handleClick} >Add to Cart</button>
                </div> */}
                <div>
                <button value = {product.id} onClick={this.handleAdd} >+</button>
                <span>0</span>
                <button value = {product.id} onClick={this.handleRemove}>-</button>
                </div>
            </div>
        </div>
    );
    }
};

const mapDispatch = (dispatch) => {
    return {
        addItem: (orderId, productId) => dispatch(addToCart(orderId, productId)),
        removeItem: (orderId, productId) => dispatch(removeFromCart(orderId, productId)),
    }
}

export default connect(null,mapDispatch)(EachProduct);
