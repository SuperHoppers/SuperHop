//check routes and filenames
import React from "react";
import { connect } from "react-redux";
import EachProduct from "./EachProduct";
import { fetchAllProducts } from "../store/products";
import { fetchOrder } from "../store/orders";

/**
 * COMPONENT
 */

export class AllProducts extends React.Component {
  componentDidMount() {
    const orderNum = 19;
    window.localStorage.setItem("orderNum", orderNum);
    this.props.loadProducts();
    const orderId = window.localStorage.getItem("orderNum");
    this.props.loadOrder(orderId);
  }
  render() {
    console.log(this.props.isLoggedIn);
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
    products: state.products.allProducts,
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => ({
  loadProducts: () => dispatch(fetchAllProducts()),
  loadOrder: (orderId) => dispatch(fetchOrder(orderId)),
});

export default connect(mapState, mapDispatch)(AllProducts);
