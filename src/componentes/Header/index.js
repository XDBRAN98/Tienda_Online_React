import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../acces/logo.png";

export const Header = () => {
  const location = useLocation();

  return (
    <header>
      <Link to="/">
        <div className="logo">
          <img src={Logo} alt="" width="150" />
        </div>
      </Link>

      <div className="header_icons">
        <div className="cart">
          <box-icon name="cart"></box-icon>
          <span className="item__total">0</span>
        </div>

        {location.pathname !== "/login" && (
          <Link to="/login">
            <div className="login">
              <h3>Login</h3>
              <box-icon name="user"></box-icon>
            </div>
          </Link>
        )}
      </div>
    </header>
  );
};

