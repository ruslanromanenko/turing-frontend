import React from "react";
import classes from "./MainHeader.module.css";
import { NavLink } from "react-router-dom";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import ProductPrice from "../ProductPrice/ProductPrice";

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
            <NavLink
              to={{
                pathname: "/categories"
              }}
              exact
            >
              Categories
            </NavLink>
          </li>
        </ul>
      </nav>
      <NavLink to="/cart" className={classes.Cart}>
        <span className={classes.CartHeader}>
          <ShoppingCart />
          {totalAmount !== 0 && (
            <span className={classes.AmountProduct}>{totalAmount}</span>
          )}
          <span className={classes.PriceProduct}>
            Your bag: &nbsp;
            <span className={classes.Price}>
              <ProductPrice price={totalPrice} />
            </span>
          </span>
        </span>
      </NavLink>
    </div>
  );
};
export default MainHeader;
