import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleProduct } from '../store/products';

class CartItem extends React.Component{

  render(){
    const { id, name, price, imageURL } = this.props.product;
    return (
      <div className="cart">
      <div className="cart__list">
        <ul className="cart__list__container">
          <li>
            <div>Price</div>
          </li>
          <li>
            <div className="cart__image">
              <img
                src={imageURL}
                alt="cart img"
              />
            </div>
            <div className="cartItem__name">
              <div>
                {name}
              </div>
              <div>
                Quantity:
                <button value = {id} onClick = {this.props.handleAdd}>+</button>
                <span>{this.props.quantity}</span>
                <button value = {id} onClick = {this.props.handleRemove}>-</button>
              </div>
            </div>
            <div className="cart__price">${price * this.props.quantity}</div>
          </li>
        </ul>
      </div>
    </div>
    )
  }
}

export default CartItem
