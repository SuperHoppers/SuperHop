//check routes and filenames
import React from "react";
import { connect } from "react-redux";
import EachProduct from "./EachProduct";
import { fetchAllProducts } from "../store/products";
import {addToCart, removeFromCart, fetchOrder} from '../store/orders'
/**
 * COMPONENT
 */

export class AllProducts extends React.Component {
  constructor(){
    super()
    this.state = {
        cart: []
    }
    this.handleAdd = this.handleAdd.bind(this)
}
  componentDidMount() {
    if ( this.props.isLoggedIn ){
      this.props.loadOrder(this.props.user)
    } else{
      console.log('not logged in')
    }
    this.props.loadProducts()
  }
  handleAdd(evt){
    evt.preventDefault();
    const orderId = 1;
    const productId = evt.target.value;
    this.props.addItem(2,productId);
}
  render() {
   // console.log(this.props.isLoggedIn);
   // console.log(this.props.order)
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
                  <EachProduct product={product} />
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
    order: state.orders.cartItems,
    products: state.products.allProducts,
    isLoggedIn: !!state.auth.id,
    user: state.auth.id,
  };
};

const mapDispatch = (dispatch) => ({
  loadProducts: () => dispatch(fetchAllProducts()),
  loadOrder: (userId) => dispatch(fetchOrder(userId)),
});

export default connect(mapState, mapDispatch)(AllProducts);
