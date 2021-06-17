import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSingleProduct } from "../store/products";
import { addToCart } from '../store/orders';

class SingleProduct extends Component {
    componentDidMount() {
        const { productId } = this.props.match.params;
        this.props.loadSingleProduct(productId);
    }
    constructor(){
        super()
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(evt){
        evt.preventDefault();
        const orderId = 1;
        const productId = evt.target.value;
        this.props.addItem(orderId,productId);
    }
    render() {
        const { id, name, price, description, imageURL } = this.props.product;
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
                        <button value = {id} onClick={this.handleClick} type="button">Add to Cart</button>
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
    loadSingleProduct: (productId) => dispatch(fetchSingleProduct(productId)),
    addItem: (productId, orderId) => dispatch(addToCart(productId,orderId))
});

export default connect(mapState, mapDispatch)(SingleProduct);
