import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSingleProduct } from "../store/products";

class SingleProduct extends Component {
    componentDidMount() {
        const { productId } = this.props.match.params;
        this.props.loadSingleProduct(productId);
    }

    render() {
        const { name, price, description, imageURL } = this.props.product;
        return (
            <>
                <div className="backTo_products">
                    <Link to="/products">Back to products</Link>
                </div>

                <div className="single__product">
                    <div className="singleProduct__image">
                        <img src={imageURL} />
                    </div>
                    <div className="singleProduct__info">
                        <ul>
                            <li>
                                <h4>{name}</h4>
                            </li>
                            <li>
                                <h3>${price}</h3>
                            </li>
                            <li>
                                <strong>Description:</strong>
                                <div className="singleProduct__description">
                                    {description}
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* feat: add to cart */}
                    <div>
                        <button type="button">Add to Cart</button>
                    </div>
                </div>
            </>
        );
    }
}

const mapState = (state) => ({
    product: state.products.singleProduct
});

const mapDispatch = (dispatch) => ({
    loadSingleProduct: (productId) => dispatch(fetchSingleProduct(productId))
});

export default connect(mapState, mapDispatch)(SingleProduct);
