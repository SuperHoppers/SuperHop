import React from "react";
import { Link } from "react-router-dom";
// import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

const Header = () => {
    return (
        <div className="header">
            <Link to="/">
                <img
                    className="header__logo"
                    src="data:image/png;base64,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"
                    alt="the logo"
                />
            </Link>

            {/* <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div> */}

            <div className="header__nav">
                <div className="header__option">
                    <span className="header__optionLineOne">Hello Guest!</span>
                    <Link to="/login">
                        <span className="header__optionLineTwo">Sign In</span>
                    </Link>
                </div>
            </div>

            <Link to="/cart">
                <div className="header__optionBasket">
                    <ShoppingBasketIcon />
                    <span className="header__optionLineTwo header__basketCount">
                        0
                    </span>
                </div>
            </Link>
            
        </div>
    );
};

export default Header;
