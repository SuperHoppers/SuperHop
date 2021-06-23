import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {guestCheckout} from '../store/orders';
import CartItem from './CartItem';
 // import from store

class Cart extends Component {
  constructor(){
    super()
    this.state = {
      cart: {}
    }
    this.handleCheckout = this.handleCheckout.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }
  componentDidMount(){
    let localCart = JSON.parse(window.localStorage.getItem('cart'));
    this.setState({cart:localCart})
  }
  handleAdd(evt){
    evt.preventDefault();
    const productId = evt.target.value;
    if(this.props.isLoggedIn){
        const orderId = this.props.order.id;
        this.props.addItem(orderId,productId);
    } else {
      let localCart = JSON.parse(window.localStorage.getItem('cart'))
      if(localCart[productId]){
        localCart[productId] += 1
      } else {
        localCart[productId] = 1;
      }
      this.setState({cart:localCart})
      window.localStorage.setItem('cart', JSON.stringify(localCart))
    }
}
handleRemove(evt){
  evt.preventDefault();
  const productId = evt.target.value;
  if(this.props.isLoggedIn){
      const orderId = this.props.order.id;
      this.props.removeItem(orderId,productId);
  } else {
    let localCart = JSON.parse(window.localStorage.getItem('cart'))
    localCart[productId] -= 1;
    this.setState({cart:localCart})
    window.localStorage.setItem('cart', JSON.stringify(localCart))
  }
}
  handleCheckout(evt){
    evt.preventDefault()
    const localCart = JSON.parse(window.localStorage.getItem('cart'));
    this.props.guestCheck(localCart);

  }
  render() {
    const localCart = [];
    const cartState =  this.state.cart
    for(let product in cartState){
      localCart.push({[product]: cartState[product]})
    }
    console.log(Object.keys(cartState))
    return (
      <div className="cart">
        {Object.keys(cartState).length ? Object.keys(cartState).map((cartItem) => <CartItem handleAdd ={this.handleAdd} handleRemove = {this.handleRemove} key = {parseInt(cartItem)} id = {parseInt(cartItem)} quantity = {cartState[cartItem]}/>) : 'Your cart is empty!'}
        <div className="cart__action">
          <h3>Subtotal:</h3>
          <Link to="/checkout">
            <button onClick ={this.handleCheckout}>Proceed to Checkout</button>
          </Link>
        </div>
      </div>
    );
  }
}


const mapDispatch = (dispatch) => {
  return {
    guestCheck: (cart) => dispatch(guestCheckout(cart)),
    addItem: (orderId, productId) => dispatch(addToCart(orderId, productId)),
    removeItem: (orderId, productId) => dispatch(removeFromCart(orderId, productId))
  }
};

export default connect(null, mapDispatch)(Cart);
