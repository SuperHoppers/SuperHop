import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
    guestCheckout,
    fetchOpenCart,
    fetchOrder,
    checkout,
    addToCart,
    removeFromCart
} from "../store/orders";
import CartItem from "./CartItem";
import { fetchAllProducts } from "../store/products";
// import from store

class Cart extends Component {
    constructor() {
        super();
        this.state = {
            cart: {},
            totalPrice: 0
        };
        this.handleCheckout = this.handleCheckout.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }
    componentDidMount() {
        if (this.props.isLoggedIn) {
            this.props.getOrder(this.props.user);
            this.props.getCartItems(this.props.user);
        }
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
        if (this.props.isLoggedIn) {
            this.props.userCheck(this.props.order.id);
        } else {
            const localCart = JSON.parse(window.localStorage.getItem("cart"));
            this.props.guestCheck(localCart);
            const newCart = {};
            this.setState({ cart: newCart });
            window.localStorage.setItem("cart", JSON.stringify(newCart));
        }
    }
    render() {
        let cartItems = [];
        const cartState = this.state.cart;
        if (this.props.isLoggedIn) {
            let cartKeys = [];
            // (this.props.items).forEach(product => cartKeys.push(product.productId))
            // (this.props.products).forEach((product) => {
            //   let productIdString = product.id.toString()
            //   if (cartKeys.includes(productIdString)){
            //     cartItems.push(product)
            //   }
            // })
        } else {
            const cartKeys = Object.keys(cartState);
            this.props.products.forEach((product) => {
                let productIdString = product.id.toString();
                if (cartKeys.includes(productIdString)) {
                    cartItems.push(product);
                }
            });
        }

        let totalPrice;
        totalPrice = cartItems.reduce((accum, item) => {
            return accum + item.price * cartState[item.id];
        }, 0);
        if (this.state.totalPrice !== totalPrice) {
            this.setState({ totalPrice: totalPrice });
        }

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
                    <h3>Subtotal: ${totalPrice > 0 ? totalPrice : 0}</h3>
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
            dispatch(removeFromCart(orderId, productId)),
        getCartItems: (userId) => dispatch(fetchOpenCart(userId)),
        getOrder: (userId) => dispatch(fetchOrder(userId)),
        userCheck: (orderId) => dispatch(checkout(orderId))
    };
};

export default connect(mapState, mapDispatch)(Cart);
