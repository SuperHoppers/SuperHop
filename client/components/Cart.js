import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { guestCheckout } from "../store/orders";
import CartItem from "./CartItem";
import { fetchAllProducts } from "../store/products";
// import from store

class Cart extends Component {
    constructor() {
        super();
        this.state = {
            cart: {}
        };
        this.handleCheckout = this.handleCheckout.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }
    componentDidMount() {
        let localCart = JSON.parse(window.localStorage.getItem("cart"));
        this.setState({ cart: localCart });
        this.props.getProducts();
    }
    handleAdd(evt) {
        evt.preventDefault();
        const productId = evt.target.value;
        if (this.props.isLoggedIn) {
            const orderId = this.props.order.id;
            this.props.addItem(orderId, productId);
        } else {
            let localCart = JSON.parse(window.localStorage.getItem("cart"));
            if (localCart[productId]) {
                localCart[productId] += 1;
            } else {
                localCart[productId] = 1;
            }
            this.setState({ cart: localCart });
            window.localStorage.setItem("cart", JSON.stringify(localCart));
        }
    }
    handleRemove(evt) {
        evt.preventDefault();
        const productId = evt.target.value;
        if (this.props.isLoggedIn) {
            const orderId = this.props.order.id;
            this.props.removeItem(orderId, productId);
        } else {
            let localCart = JSON.parse(window.localStorage.getItem("cart"));
            localCart[productId] -= 1;
            this.setState({ cart: localCart });
            window.localStorage.setItem("cart", JSON.stringify(localCart));
        }
    }
    handleCheckout(evt) {
        evt.preventDefault();
        const localCart = JSON.parse(window.localStorage.getItem("cart"));
        this.props.guestCheck(localCart);
    }
    render() {
        const cartState = this.state.cart;
        const cartKeys = Object.keys(cartState);
        let cartItems = [];
        this.props.products.forEach((product) => {
            let productIdString = product.id.toString();
            if (cartKeys.includes(productIdString)) {
                cartItems.push(product);
            }
        });

        return (
            <div className="cart">
                {cartItems.length > 0
                    ? cartItems.map((cartItem) => {
                          return (
                              <CartItem
                                  handleAdd={this.handleAdd}
                                  handleRemove={this.handleRemove}
                                  product={cartItem}
                                  key={cartItem.id}
                                  quantity={cartState[cartItem.id]}
                              />
                          );
                      })
                    : "Your cart is empty!"}

                <div className="cart__action">
                    <h3>
                        Subtotal: $
                        {cartItems.length > 0
                            ? cartItems.reduce((accum, item) => {
                                  console.log("accum>>>", accum);
                                  return (
                                      accum + item.price * cartState[item.id]
                                  );
                              }, 0)
                            : "Nothing in cart"}
                    </h3>
                    <Link to="/checkout">
                        <button onClick={this.handleCheckout}>
                            Proceed to Checkout
                        </button>
                    </Link>
                </div>
            </div>
        );
    }
}

const mapState = (state) => {
    return {
        items: state.orders.cartItems,
        order: state.orders.order,
        products: state.products.allProducts,
        isLoggedIn: !!state.auth.id,
        user: state.auth.id
    };
};

const mapDispatch = (dispatch) => {
    return {
        getProducts: () => dispatch(fetchAllProducts()),
        guestCheck: (cart) => dispatch(guestCheckout(cart)),
        addItem: (orderId, productId) =>
            dispatch(addToCart(orderId, productId)),
        removeItem: (orderId, productId) =>
            dispatch(removeFromCart(orderId, productId))
    };
};

export default connect(mapState, mapDispatch)(Cart);
