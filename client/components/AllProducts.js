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
        cart: ['d0', {'hey': 'hello'}, 2]
    }
    this.handleAdd = this.handleAdd.bind(this)
}
  componentDidMount() {
    if ( this.props.isLoggedIn ){
      this.props.loadOrder(this.props.user)
    } else{
      console.log('not logged in')
      window.localStorage.setItem('cart', JSON.stringify(this.state.cart))
      const currentCart = window.localStorage.getItem('cart');
      if(currentCart){
        this.setState(JSON.parse(currentCart))
        console.log(this.state)
      }
    }
    this.props.loadProducts()
  }
  handleAdd(evt){
    evt.preventDefault();
    const productId = evt.target.value;
    if(this.props.order === 'no-order'){
      this.props.addItem(undefined,productId);
    } else {
      console.log('IN REACT part 2')
      const orderId = 1;
      this.props.addItem(2,productId);
    }
}
  render() {
   // console.log(this.props.isLoggedIn);
   console.log('IN REACT', this.props.order)
   console.log(this.state)
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
    order: state.orders.cartItems,
    products: state.products.allProducts,
    isLoggedIn: !!state.auth.id,
    user: state.auth.id,
  };
};

const mapDispatch = (dispatch) => ({
  loadProducts: () => dispatch(fetchAllProducts()),
  loadOrder: (userId) => dispatch(fetchOrder(userId)),
  addItem: (orderId, productId) => dispatch(addToCart(orderId, productId)),
});

export default connect(mapState, mapDispatch)(AllProducts);
