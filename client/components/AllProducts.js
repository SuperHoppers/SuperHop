//check routes and filenames
import React from "react";
import { connect } from "react-redux";
import EachProduct from "./EachProduct";
import { fetchAllProducts } from "../store/products";
import {addToCart, createOrder, fetchOrder} from '../store/orders'
/**
 * COMPONENT
 */

export class AllProducts extends React.Component {
  constructor(){
    super()
    this.state = {
        cart: {}
    }
    this.handleAdd = this.handleAdd.bind(this)
}
  componentDidMount() {
    if (this.props.isLoggedIn ){
      this.props.loadOrder(this.props.user)
    }
    this.props.loadProducts()
  }
  handleAdd(evt){
    evt.preventDefault();
    const productId = evt.target.value;
    if(this.props.isLoggedIn){
      if(!this.props.order.id){
        const userId = this.props.user;
        this.props.createOrder(productId, userId);
      } else {
        const orderId = this.props.order.id;
        this.props.addItem(orderId,productId);
      }
    } else {
      let cart = JSON.parse(window.localStorage.getItem('cart'))
      if(!cart) {
        window.localStorage.setItem('cart',JSON.stringify({}))
      }
      cart = JSON.parse(window.localStorage.getItem('cart'))
      if(cart[productId]){
        cart[productId] += 1
      } else {
        cart[productId] = 1;
      }
      this.setState({cart:cart})
      window.localStorage.setItem('cart', JSON.stringify(cart))
    }
}
  render() {
    return (
      <div id='products-page'>
        <div>
          <h1 className='page-title'>Superpowers Available for Purchase</h1>
        </div>
        <ul className='products'>
          {this.props.products.length > 0 ? (
            this.props.products.map((product) => {
              return (
                <li className='productContainer' key={product.id}>
                  <EachProduct product={product} handleAdd = {this.handleAdd}/>
                </li>
              );
            })
          ) : (
            <h2>No products available</h2>
          )}
        </ul>
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
    user: state.auth.id,
  };
};

const mapDispatch = (dispatch) => ({
  loadProducts: () => dispatch(fetchAllProducts()),
  loadOrder: (userId) => dispatch(fetchOrder(userId)),
  addItem: (orderId, productId) => dispatch(addToCart(orderId, productId)),
  createOrder: (productId, userId) => dispatch(createOrder(productId, userId))
});

export default connect(mapState, mapDispatch)(AllProducts);
