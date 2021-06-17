//check routes and filenames

import React from "react";
import { Link } from "react-router-dom";

/**
 * COMPONENT
 */
const EachProduct = (props) => {
    //const thisProduct = props.product;
    // const thisProduct = {
    //   name: 'Explody Bugs',
    //   price: 900,
    //   id: 7,
    //   imageURL:
    //     'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/c/c2/OoT_Bombchu_Render.png',
    // };
    const product = props.product;

    return (
        <div className="listViewDiv">
            <div id="picListView">
                <img
                    className="product__image"
                    src={product.imageURL}
                    alt="product"
                />
            </div>
            <div className="listViewDiv namePrice">
                <div className="product__name">
                    <Link to={`/products/${product.id}`}>
                        <h3>{product.name}</h3>
                    </Link>
                </div>

                <div className="product__price">
                    <h4>${product.price}</h4>
                </div>
                <div className="cart__btn">
                    <button>Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default EachProduct;
