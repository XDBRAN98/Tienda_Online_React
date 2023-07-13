import React from "react";
import { Link, useLocation } from "react-router-dom";
import 'boxicons';
import Logo from "../../acces/logo.png";

export const Header = () => {
  const location = useLocation();
  
  return (
    <header className="header__primario">
      <Link to="/">
        <div className="logo">
          <img src={Logo} alt="" width="180" />
        </div>
      </Link>

      <div className="header_icons">
        <div className="cart">
          <Link to={"/cart"}>
          <box-icon name="cart"></box-icon>
          </Link>
          <span className="item__total">0</span>
        </div>

        {location.pathname !== "/login" && (
          <Link to="/login">
            <div className="login">
              <box-icon name="user"></box-icon>
            </div>
          </Link>
        )}
      </div>
    </header>
  );
};

