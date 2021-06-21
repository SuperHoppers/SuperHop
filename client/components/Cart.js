import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import from store

class Cart extends Component {
  render() {
    return (
      <div className="cart">
        <div className="cart__list">
          <ul className="cart__list__container">
            <li>
              <h3>Shopping Cart</h3>
              <div>Price</div>
            </li>
            {/* conditional statement: if no items in the cart */}
            {/* <div>Cart is empty!</div> */}
            {/* : otherwise, map over the cart items */}
            <li>
              <div className="cart__image">
                <img
                  src="https://i.pinimg.com/originals/c3/69/e7/c369e74c60a3d178168da78fdb1642d7.png"
                  alt="sample img"
                />
              </div>
              <div className="cartItem__name">
                <div>
                  {/* Single Product Link here */}
                  Lightning Power
                </div>
                <div>
                  Quantity:
                  <button>+</button>
                  <button>-</button>
                  <div>
                    Remove from Cart:
                    <button>REMOVE ITEM</button>
                  </div>
                </div>
              </div>
              <div className="cart__price">$100000</div>
            </li>
          </ul>
        </div>

        <div className="cart__action">
          <h3>Subtotal:</h3>
          <Link to="/checkout">
            <button>Proceed to Checkout</button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {};

const mapDispatch = (dispatch) => {};

export default connect(mapState, mapDispatch)(Cart);
