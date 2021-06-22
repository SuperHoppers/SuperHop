import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSingleUser } from "../store/users";

class SingleUser extends Component {
  componentDidMount() {
    const { userId } = this.props.match.params;
    this.props.loadSingleUser(userId);
  }
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(evt) {
    evt.preventDefault();
  }
  render() {
    console.log(this.props, "SingleUser");
    if (!this.props.user || !this.props.isAdmin) {
      return (
        <div>
          <h2>
            This user has purchased invisibility. What a great superpower! Maybe
            you should buy some, too.
          </h2>
        </div>
      );
    }
    const { id, username, address, phoneNumber, email, imageURL } =
      this.props.user;
    return (
      <>
        <div>
          <Link to='/users'>Back to All Customers and Staff Page</Link>
        </div>

        <div className='single__product'>
          <div className='singleProduct__image'>
            <img src={imageURL} />
          </div>
          <div className='singleProduct__info'>
            <ul>
              <li>
                <h2>Alias: {username}</h2>
              </li>
              <li>
                <small>Customer number: {id}</small>
              </li>
              <li>
                <h3>Contact phone: {phoneNumber}</h3>
              </li>
              <li>
                <h3>E-mail address: {email}</h3>
              </li>
              <li>
                <h4>
                  Shipping Address:
                  {address}
                </h4>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }
}

const mapState = (state) => ({
  user: state.user,
  isAdmin: state.auth.isAdmin,
});

const mapDispatch = (dispatch) => ({
  loadSingleUser: (userId) => dispatch(fetchSingleUser(userId)),
});

export default connect(mapState, mapDispatch)(SingleUser);
