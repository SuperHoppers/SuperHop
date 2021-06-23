import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createNewProduct } from '../../store/products';

class AdminProductForm extends React.Component {
  constructor() {
    super();
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

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.createProduct({ ...this.state });
  }

  render() {
    const { name, price, inventory, image, description } = this.state;
    return (
      <div className="form">
        <form onSubmit={this.handleSubmit}>
          <ul className="form__container">
            <li>
              <h2>Add New Product</h2>
            </li>
            {/* <li>{error && <div>{error.response.data}</div>}</li> */}
            <li>
              <label htmlFor="name">Product Name:</label>
              <input
                name="name"
                type="text"
                onChange={this.handleChange}
                value={name}
              />
            </li>

            <li>
              <label htmlFor="price">Price:</label>
              <input
                name="price"
                type="text"
                onChange={this.handleChange}
                value={price}
              />
            </li>

            <li>
              <label htmlFor="inventory">Inventory/Stock:</label>
              <input
                name="inventory"
                type="text"
                onChange={this.handleChange}
                value={inventory}
              />
            </li>

            <li>
              <label htmlFor="description">Description:</label>
              <textarea
                name="description"
                type="text"
                onChange={this.handleChange}
                value={description}
              />
            </li>

            <li>
              <label htmlFor="image">Image:</label>
              <textarea
                name="image"
                type="text"
                onChange={this.handleChange}
                value={image}
              />
              {/* {uploading && <div>Uploading...</div>} */}
            </li>

            <li>
              <button type="submit" className="primary__btn">
                {/* {product.id ? "Update Product" : "Create Product"} */}
                Submit Changes
              </button>
            </li>

            <li>
              {/* Back to Admin Product List */}
              <Link to="/admin/products">
                <button className="secondary__btn">Back to Product list</button>
              </Link>
            </li>
          </ul>
        </form>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    newProduct: state.products.newProduct
  }
}

const mapDispatch = (dispatch, {history}) => ({
  createProduct: (newProduct) => dispatch(createNewProduct(newProduct, history)),
});

export default connect(mapState, mapDispatch)(AdminProductForm);
