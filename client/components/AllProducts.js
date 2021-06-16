//check routes and filenames
import React from "react";
import { connect } from "react-redux";
import EachProduct from "./EachProduct";
import { fetchAllProducts } from "../store/products";

/**
 * COMPONENT
 */

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.loadProducts();
  }

  render() {
    return (
      <div>
        <h1 className='page-title'>Superpowers Available for Purchase</h1>
        <div>
          {this.props.products.length > 0 ? (
            this.props.products.map((product) => {
              return (
                <div className='productContainer' key={product.id}>
                  <EachProduct product={product} />
            </div>
            
        );
        </div>
    }
  }

const mapState = (state) => {
    return {
        products: state.products.allProducts
    };
};

const mapDispatch = (dispatch) => ({
    loadProducts: () => dispatch(fetchAllProducts())
});

export default connect(mapState, mapDispatch)(AllProducts);
