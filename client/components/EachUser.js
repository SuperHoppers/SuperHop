//check routes and filenames

import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

/**
 * COMPONENT
 */
class EachUser extends React.Component {
  constructor() {
    super();
  }

  render() {
    const user = this.props.user;
    return (
      <div className='listViewDiv'>
        <div>
          <img
            className='picListView'
            src={user.imageURL}
            alt={`${user.name} picture`}
          />
        </div>
        <div className='listViewDiv details'>
          <div>
            <Link to={`/users/${user.id}`}>
              <div>
                <h3>Alias: {user.username}</h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {};

export default connect(null, mapDispatch)(EachUser);
