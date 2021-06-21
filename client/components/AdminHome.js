import { render } from "enzyme";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import AdminProductForm from "./AdminProductForm";
import AdminProductList from "./AdminProductList";
import AdminOrderList from "./AdminOrderList";

const AdminHome = () => {
    return (
        <>
            {/* <div className="test div">
                <AdminOrderList />
            </div> */}

            <div className="admin__tools">
                <div className="admin__product">
                    <h2>Product Tools</h2>
                    <Link to="/admin/products">
                        <button className="admin__all__products">
                            Current Products
                        </button>
                    </Link>
                    <Link to="/admin/products/create">
                        <button className="admin__create__product">
                            Add new Product
                        </button>
                    </Link>
                </div>

                <div className="admin__order">
                    <h2>Order Tools</h2>
                    <Link to="/admin/orders">
                        <button className="admin__order__btn">
                            Orders Page
                        </button>
                    </Link>
                </div>

                {/* Not sure if we need this */}
                {/* <div className="admin__users">
                    <h2>User Tools</h2>
                    <Link to="/admin/users">
                        <button className="admin__users__btn">
                            Users List
                        </button>
                    </Link>
                </div> */}
            </div>
        </>
    );
};

//     return (
//         <>
//             <div className="home-design">
//                 <h1 className="Home-header">Welcome to the Store, Admin!</h1>
//                 <p>Hi!</p>
//                 <img
//                     src="https://www.flintasbury.org/wp-content/uploads/2019/08/superpower.jpg"
//                     className="homeImg"
//                 />
//             </div>

//             <div className="home-products">
//                 <Link to="/products">All Products</Link>
//             </div>
//         </>
//     );
// };

const mapState = (state) => {
    return {
        isAdmin: state.auth.isAdmin
    };
};

export default connect(mapState)(AdminHome);

// /**
//  * COMPONENT
//  */
// export const Home = props => {
//   const {username} = props

//   return (
//     <div>
//       <h3>Welcome, {username}</h3>
//     </div>
//   )
// }

// /**
//  * CONTAINER
//  */
// const mapState = state => {
//   return {
//     username: state.auth.username
//   }
// }

// export default connect(mapState)(Home)
