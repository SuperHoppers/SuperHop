import React from "react";
import { render } from "enzyme";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import AdminProductForm from "./AdminCreateProductForm";
import AdminProductList from "./AdminProductList";
import AdminOrderList from "./AdminOrderList";
import AdminUpdateProductForm from "./AdminUpdateProductForm";

const AdminHome = (props) => {
    return (
        <div>
            <div className="home-design">
                <img
                    src="https://www.flintasbury.org/wp-content/uploads/2019/08/superpower.jpg"
                    id="homeImg"
                />
                <div id="home-header">
                    <h1>
                        Welcome to the Store
                        {props.username
                            ? `, Admin ${props.username}`
                            : `, sneaky supervillain`}
                        !
                    </h1>
                    <p>
                        {props.username
                            ? "What are your goals for today?"
                            : `You can do no harm here, for this area is troll-, villain-, and Ben-resistant. \nHave fun and enjoy the aesthetics.`}
                    </p>
                </div>
            </div>
            {/* <div className="test div">
                <AdminOrderList />
            </div> */}

            <div className="admin__tools">
                <div className="admin__product">
                    <h2>Product Tools</h2>
                    <Link to="/admin/products">
                        <button className="admin__btn">Current Products</button>
                    </Link>
                    <Link to="/admin/products/create">
                        <button className="admin__btn">Add new Product</button>
                    </Link>
                </div>

                <div className="admin__order">
                    <h2>Order Tools</h2>
                    <Link to="/admin/orders">
                        <button className="admin__btn">Orders Page</button>
                    </Link>
                </div>

                {/* Not sure if we need this */}
                {/* <div className="admin__users">
                    <h2>User Tools</h2>
                    <Link to="/admin/users">
                        <button className="admin__btn">
                            Users List
                        </button>
                    </Link>
                </div> */}

                {/* <div className="test div">
                    <AdminProductList />
                    <AdminUpdateProductForm />
                </div> */}
            </div>

            <div id="home-products">
                <Link to="/products">All Products</Link>
            </div>
        </div>
    );
};

const mapState = (state) => {
    return {
        isAdmin: state.auth.isAdmin,
        username: state.auth.username
    };
};

export default connect(mapState)(AdminHome);
