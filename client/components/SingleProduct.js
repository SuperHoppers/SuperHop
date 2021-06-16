import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleProduct } from '../store/products';

class SingleProduct extends Component {
  componentDidMount() {
    const { productId } = this.props.match.params;
    this.props.loadSingleProduct(productId);
  }

  render() {
    const { name, price, description, imageURL } = this.props.product;
    return (
      <div className='single-product'>
        <h2>{name}</h2>
        <img src={imageURL} />
        <h3>{price}</h3>
        <p>{description}</p>
        {/* feat: add to cart */}
        <div>
          <button type='button'>Add to Cart</button>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  product: state.product,
});

const mapDispatch = (dispatch) => ({
  loadSingleProduct: (productId) => dispatch(fetchSingleProduct(productId)),
});

export default connect(mapState, mapDispatch)(SingleProduct);
