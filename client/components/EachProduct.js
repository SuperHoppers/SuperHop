//check routes and filenames

import React from "react";
import { Link } from "react-router-dom";
import {addToCart, removeFromCart, fetchOrder} from '../store/orders'
import {fetchUserCart} from '../store/users'
import { connect } from 'react-redux';

/**
 * COMPONENT
 */

// is logged in? yes: currentOrder(this.props.user) no: is Local storage? -> yes: getItem no:
class EachProduct extends React.Component{
    constructor(){
        super()
        this.handleAdd = this.handleAdd.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
    }
    componentDidMount(){
        if(this.props.isLoggedIn){
            console.log(this.props)
          this.props.loadUserOrderId(this.props.user);
           console.log(this.props.cartId);
        }
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

const mapState = (state) => {
    return {
        order: state.orders,
        isLoggedIn: !!state.auth.id,
        user: state.auth.id,
        cartId: state.users.cartId,
    }
}

const mapDispatch = (dispatch) => {
    return {
        addItem: (orderId, productId) => dispatch(addToCart(orderId, productId)),
        removeItem: (orderId, productId) => dispatch(removeFromCart(orderId, productId)),
        loadOrder: (orderId) => dispatch(fetchOrder(orderId)),
        loadUserOrderId: (userId) => dispatch(fetchUserCart(userId))
    }
}

export default connect(mapState,mapDispatch)(EachProduct);
