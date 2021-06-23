import React from 'react';
import { connect } from 'react-redux';
import { fetchAllProductsAdmin, deleteProductThunk } from '../../store/products';
import { Link } from 'react-router-dom';

export class AdminProductList extends React.Component {
  constructor() {
      super();
      this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.loadProducts();
  }

  handleDelete(id) {
      this.props.deleteProduct(id);
  }

  render() {
    const { products } = this.props;

    if(this.props.products.length > 0){
    return (
      <div className="product__list">
        <table className="table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Inventory</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.inventory}</td>
                <td>{product.description}</td>
                <td>
                  <Link to={`/admin/products/${product.id}`}>
                    <button className="button">Edit </button>
                  </Link>
                  <button className="button" type='button' onClick={()=>this.handleDelete(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );}
    else {
      return (
        <div><h2>Sorry, you seem to be lost. Try our <Link to="/products">All Products</Link> page.</h2></div>
      )
    }
  }
}

const mapState = (state) => {
  return {
    products: state.products.allProducts,
  };
};

const mapDispatch = (dispatch, {history}) => {
  return {
    loadProducts: () => dispatch(fetchAllProductsAdmin()),
    deleteProduct: (id) => dispatch(deleteProductThunk(id, history))
  };
};

export default connect(mapState, mapDispatch)(AdminProductList);
