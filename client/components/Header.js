import React from 'react';
import { Link } from 'react-router-dom';
// import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { connect } from 'react-redux';
import { logout } from '../store';

const Header = ({ handleClick, isLoggedIn, username }) => {
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
          <span className="header__optionLineOne">
            Hello {!username ? 'Guest' : username}!
          </span>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">
                <span className="header__optionLineTwo">Sign In</span>
              </Link>
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
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    username: state.auth.username,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Header);

// export default Header;
