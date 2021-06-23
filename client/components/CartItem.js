import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleProduct } from '../store/products';

class CartItem extends React.Component{
  componentDidMount() {
    const productId  = this.props.id;
    this.props.loadSingleProduct(productId);
}
  render(){
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
                src={this.props.product.imageURL}
                alt="cart img"
              />
            </div>
            <div className="cartItem__name">
              <div>
                {/* Single Product Link here */}
                {this.props.product.name}
              </div>
              <div>
                Quantity:
                <button onClick = {this.props.handleAdd}>+</button>
                <span>{this.props.quantity}</span>
                <button onClick = {this.props.handleRemove}>-</button>
                {/* <div>
                  Remove from Cart:
                  <button>REMOVE ITEM</button>
                </div> */}
              </div>
            </div>
            <div className="cart__price">${this.props.product.price * this.props.quantity}</div>
          </li>
        </ul>
      </div>
    </div>
    )
  }
}


const mapState = (state) => ({
  product: state.products.singleProduct
});

const mapDispatch = (dispatch) => ({
  loadSingleProduct: (productId) => dispatch(fetchSingleProduct(productId)),
});

export default connect(mapState, mapDispatch)(CartItem)
