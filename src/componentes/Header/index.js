import React from "react";
import Logo from "../../acces/logo.png";
import { Link } from "react-router-dom";

export const Header = () => {
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
                <div className="login">
                    <box-icon name="user"></box-icon>
                </div>
            </div>
        </header>
    )
};