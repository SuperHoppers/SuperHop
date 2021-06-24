import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSingleProduct } from "../store/products";
import { addToCart } from '../store/orders';

class SingleProduct extends Component {
    componentDidMount() {
        const { productId } = this.props.match.params;
        this.props.loadSingleProduct(productId);
        if (this.props.isLoggedIn ){
            this.props.loadOrder(this.props.user)
          }
    }
    constructor(){
        super()
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(evt){
        evt.preventDefault();
        const productId = evt.target.value;
        if(this.props.isLoggedIn){
          if(!this.props.order.id){
            const userId = this.props.user;
            this.props.createOrder(productId, userId);
          } else {
            const orderId = this.props.order.id;
            this.props.addItem(orderId,productId);
          }
        } else {
          let cart = JSON.parse(window.localStorage.getItem('cart'))
          if(!cart) {
            window.localStorage.setItem('cart',JSON.stringify({}))
          }
          cart = JSON.parse(window.localStorage.getItem('cart'))
          if(cart[productId]){
            cart[productId] += 1
          } else {
            cart[productId] = 1;
          }
          this.setState({cart:cart})
          window.localStorage.setItem('cart', JSON.stringify(cart))
        }
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
    product: state.products.singleProduct,
    items: state.orders.cartItems,
    order: state.orders.order,
    products: state.products.allProducts,
    isLoggedIn: !!state.auth.id,
    user: state.auth.id,
});

const mapDispatch = (dispatch) => ({
    loadSingleProduct: (productId) => dispatch(fetchSingleProduct(productId)),
    addItem: (productId, orderId) => dispatch(addToCart(productId,orderId)),
    loadOrder: (userId) => dispatch(fetchOrder(userId)),
    createOrder: (productId, userId) => dispatch(createOrder(productId, userId))
});

export default connect(mapState, mapDispatch)(SingleProduct);
