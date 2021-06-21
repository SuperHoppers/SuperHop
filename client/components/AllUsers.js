//check routes and filenames
import React from "react";
import { connect } from "react-redux";
import EachUser from "./EachUser";
import { fetchAllUsers } from "../store/users";
import { fetchOrder } from "../store/orders";

/**
 * COMPONENT
 */

export class AllUsers extends React.Component {
  componentDidMount() {
    const orderNum = 19;
    window.localStorage.setItem("orderNum", orderNum);
    this.props.loadProducts();
    const orderId = window.localStorage.getItem("orderNum");
    this.props.loadOrder(orderId);
  }
  render() {
    //console.log(this.props.isLoggedIn);
    return (
      <div id='users-page'>
        <div>
          <h1 className='page-title'>Current Customers and Staff</h1>
        </div>
        <ul className='users'>
          {this.props.users.length > 0 ? (
            this.props.users.map((user) => {
              return (
                <li className='userContainer' key={user.id}>
                  <EachUser user={user} />
                </li>
              );
            })
          ) : (
            <h2>No products available</h2>
          )}
        </ul>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    users: state.users.allusers,
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => ({
  loadUsers: () => dispatch(fetchAllUsers()),
  loadOrder: (orderId) => dispatch(fetchOrder(orderId)),
});

export default connect(mapState, mapDispatch)(AllUsers);
