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
    this.props.loadUsers();
    const orderId = window.localStorage.getItem("orderNum");
    this.props.loadOrder(orderId);
  }
  render() {
    if (this.props.isAdmin) {
      return (
        <div id='users-page'>
          <div>
            <h1 className='page-title'>Current Customers and Staff</h1>
          </div>
          <ul className='users'>
            {this.props.users && this.props.users.length > 0 ? (
              this.props.users.map((user) => {
                return (
                  <li className='userContainer' key={user.id}>
                    <EachUser user={user} />
                  </li>
                );
              })
            ) : (
              <h2>There are currently no customers or staff available.</h2>
            )}
          </ul>
        </div>
      );
    } else {
      return (
        <div>
          <h2>You are not authorized to view our customers or staff.</h2>
        </div>
      );
    }
  }
}

const mapState = (state) => {
  return {
    users: state.users.allUsers,
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => ({
  loadUsers: () => dispatch(fetchAllUsers()),
  loadOrder: (orderId) => dispatch(fetchOrder(orderId)),
});

export default connect(mapState, mapDispatch)(AllUsers);
