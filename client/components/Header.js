import React from 'react';
import { Link } from 'react-router-dom';
// import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { connect } from 'react-redux';
import { logout } from '../store';
import me from '../store/auth';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   console.log(this.props.checkForLogin());
  //   if (!this.props.isLoggedIn) {
  //     this.props.checkForLogin();
  //   }
  // }

  render() {
    return (
      <div className="header">
        <Link to="/">
          <img
            className="header__logo"
            src="../../superhoplogo.png"
            alt="the logo"
          />
        </Link>

        {/* <div className="header__search">
          <input className="header__searchInput" type="text" />
          <SearchIcon className="header__searchIcon" />
        </div> */}

        <div className="header__nav">
          <div className="header__option">
            <div className="header__optionLineOne">
              Hello {!this.props.username ? 'Guest' : this.props.username}!
            </div>
            {this.props.isLoggedIn ? (
              this.props.isAdmin ? (
                <div className="header__links">
                  <Link to="/admin">Admin Tools</Link>
                  <Link to="/">Home</Link>
                  <a href="#" onClick={this.props.handleClick}>
                    Logout
                  </a>
                </div>
              ) : (
                <div className="header__links">
                  {/* The navbar will show these links after you log in */}
                  <Link to="/">Home</Link>
                  <a href="#" onClick={this.props.handleClick}>
                    Logout
                  </a>
                </div>
              )
            ) : (
              <div className="header__links">
                {/* The navbar will show these links before you log in */}
                <Link to="/login">Sign In</Link>
                <Link to="/signup">Sign Up</Link>
              </div>
            )}
          </div>
        </div>

        <Link to="/cart">
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__basketCount">0</span>
          </div>
        </Link>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    username: state.auth.username,
    isAdmin: state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
    // checkForLogin: () => dispatch(me()),
  };
};

export default connect(mapState, mapDispatch)(Header);

// export default Header;
