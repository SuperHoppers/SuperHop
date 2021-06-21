import React from 'react';
import { connect } from 'react-redux';

class CheckoutPage extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.setState({
      firstName: '',
      lastName: '',
      address: '',
    });
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  render() {
    const { address } = this.props;

    return (
      <div className="checkout-container">
        <div className="checkout-details">
          <div className="form" onSubmit={this.handleSubmit}>
            <ul className="form__container">
              <div className="form__edit">
                <li>
                  <h2>1. Shipping</h2>
                </li>
              </div>
              <li>
                <label htmlFor="firstName">First Name</label>
                <input name="firstName" type="text" placeholder="First Name" />
              </li>
              <li>
                <label htmlFor="lastName">Last Name</label>
                <input name="lastName" type="text" placeholder="Last Name" />
              </li>
              <li>
                <label htmlFor="address">Address {address}</label>
                <input name="address" type="text" placeholder="Address" />
              </li>
            </ul>
          </div>
          <div className="form" onSubmit={this.handleSubmit}>
            <ul className="form__container">
              <div className="form__edit">
                <li>
                  <h2>2. Payment</h2>
                </li>
              </div>
              <li>
                <label htmlFor="payment">Info for Payment</label>
              </li>
            </ul>
          </div>
          <div className="form">
            <ul className="form__container">
              <div className="form__edit">
                <li>
                  <h2>3. Review and Purchase</h2>
                </li>
              </div>
              <li className="review-checkout-products">
                {/* <label htmlFor="products">Info for all products in cart</label> */}
                <ul className="review-container">
                  <div>
                    <li className="review-image">
                      <img
                        src="https://i.pinimg.com/originals/c3/69/e7/c369e74c60a3d178168da78fdb1642d7.png"
                        alt="sample img"
                      />
                    </li>
                  </div>
                  <div>
                    <li className="review-name">Lightning Power</li>
                    <li className="review-price">$100000</li>
                    <li className="review-quantity">Qty: 1</li>
                  </div>
                </ul>
              </li>
              <li>
                <button type="submit" className="primary__btn">
                  Place Order
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="order-summary">
          {/* <ul className="form__container">
              <div className="form__edit">
                <li>
                  <h2>Order Summary</h2>
                </li>
              </div>
              <li>
                <label htmlFor="items">Lightning Power</label>
                <p>Qty: 1</p>
              </li>
              <li>
                <label htmlFor="orderTotal"> Order Total</label>
                <span>$100000</span>
              </li>
              <li>
                <button type="submit" className="primary__btn">
                  Place Order
                </button>
              </li>
            </ul> */}
          <ul>
            <li className="order-summary-items d-flex space-between">
              <div>
                <label htmlFor="items">Lightning Power</label>
                <p>Qty: 1</p>
              </div>
              <span>$100000</span>
            </li>

            <li className="order-summary-items d-flex space-between">
              <span>Order</span>
              <strong>total</strong>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    address: state.auth.address,
  };
};

export default connect(mapState)(CheckoutPage);
