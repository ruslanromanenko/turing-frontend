import React from "react";
import classes from "./MainHeader.module.css";
import { NavLink } from "react-router-dom";
import ShoppingCart from "@material-ui/icons/ShoppingCart";

const MainHeader = ({ totalPrice, totalAmount }) => {
  return (
    <div className={classes.MainHeader}>
      <span>Hi! Sign in or Register</span>
      <nav className={classes.MainMenu}>
        <ul>
          <li>
            <NavLink to="/" exact>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/categories" exact>
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" exact>
              Cart
            </NavLink>
          </li>
        </ul>
      </nav>
      <span className={classes.Currency}>GBP</span>
      <div className={classes.Cart}>
        <span className={classes.CartHeader}>
          <ShoppingCart />
          <span className={classes.AmountProduct}>{totalAmount}</span>
          <span className={classes.PriceProduct}>
            Your bag: <span className={classes.Price}>{totalPrice}</span>
          </span>
        </span>
      </div>
    </div>
  );
};
export default MainHeader;
