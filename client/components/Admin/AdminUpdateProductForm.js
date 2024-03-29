import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSingleProduct, updateProduct } from '../../store/products';

class AdminUpdateProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: '',
      inventory: '',
      image: '',
      description: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { productId } = this.props.match.params;
    this.props.loadProduct(productId);
    this.setState({
      name: this.props.product.name || '',
      price: this.props.product.price || '',
      inventory: this.props.product.inventory || '',
      image: this.props.product.imageURL || '',
      description: this.props.product.description || '',
    })
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.updateProduct({
      ...this.props.product,
      ...this.state,
    });
  }

  render() {
    const { name, price, inventory, imageURL, description } = this.props;
    const {handleChange, handleSubmit} = this

    return (
      <div className="form">
        <form onSubmit={handleSubmit}>
          <ul className="form__container">
            <li>
              <h2>Update Product</h2>
            </li>
            {/* <li>{error && <div>{error.response.data}</div>}</li> */}
            <li>
              <label htmlFor="name">Product Name:</label>
              <input
                name="name"
                type="text"
                onChange={handleChange}
                value={name}
              />
            </li>

            <li>
              <label htmlFor="price">Price:</label>
              <input
                name="price"
                type="text"
                onChange={handleChange}
                value={price}
              />
            </li>

            <li>
              <label htmlFor="inventory">Inventory/Stock:</label>
              <input
                name="inventory"
                type="text"
                onChange={handleChange}
                value={inventory}
              />
            </li>

            <li>
              <label htmlFor="description">Description:</label>
              <textarea
                name="description"
                type="text"
                onChange={handleChange}
                value={description}
              />
            </li>

            <li>
              <label htmlFor="imageURL">Image:</label>
              <textarea
                name="imageURL"
                type="text"
                onChange={handleChange}
                value={imageURL}
              />
              {/* {uploading && <div>Uploading...</div>} */}
            </li>

            <li>
              <button type="submit" className="primary__btn">
                Update Changes
              </button>
            </li>

            <li>
              {/* Back to Admin Product List */}
              <Link to="/admin/products">
                <button className="secondary__btn">Back To Product List</button>
              </Link>
            </li>
          </ul>
        </form>
      </div>
    );
  }
}

// export default AdminUpdateProductForm;

const mapState = (state) => {
  return {
    product: state.products.singleProduct,
  };
};

const mapDispatch = (dispatch, {history}) => {
  return {
    loadProduct: (productId) => dispatch(fetchSingleProduct(productId)),
    updateProduct: (product) => dispatch(updateProduct(product, history)),
  };
};

export default connect(mapState, mapDispatch)(AdminUpdateProductForm);
