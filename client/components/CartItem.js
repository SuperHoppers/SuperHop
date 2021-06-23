import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleProduct } from '../store/products';

class CartItem extends React.Component{
  componentDidMount() {
    const productId  = this.props.id;
    //this.props.loadSingleProduct(productId);
}
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
                {/* Single Product Link here */}
                {name}
              </div>
              <div>
                Quantity:
                <button value = {id} onClick = {this.props.handleAdd}>+</button>
                <span>{this.props.quantity}</span>
                <button value = {id} onClick = {this.props.handleRemove}>-</button>
                {/* <div>
                  Remove from Cart:
                  <button>REMOVE ITEM</button>
                </div> */}
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


// const mapState = (state) => ({
//   product: state.products.singleProduct
// });

// const mapDispatch = (dispatch) => ({
//   loadSingleProduct: (productId) => dispatch(fetchSingleProduct(productId)),
// });

export default CartItem
