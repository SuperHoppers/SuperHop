//check routes and filenames

import React from 'react';
import { connect } from 'react-redux';
import Product from './Product';
import { fetchProducts } from '../store/products';

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
                  <Product product={product} />
                </div>
              );
            })
          ) : (
            <h2>No products currently available.</h2>
          )}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatch = (dispatch) => ({
  loadProducts: () => dispatch(fetchProducts()),
});

export default connect(mapState, mapDispatch)(AllProducts);
