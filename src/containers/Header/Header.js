import React from "react";
import classes from "./Header.module.css";
import { connect } from "react-redux";
import MainHeader from "../../components/MainHeader/MainHeader";
import NavHeader from "../../components/NavHeader/NavHeader";
import constants from "../../constants";

class Header extends React.Component {
  getTotalAmount = products => {
    return products.reduce((acc, productInCart) => {
      return (acc += productInCart.amount);
    }, 0);
  };
  render() {
    return (
      <header className={classes.Header}>
        <MainHeader
          totalPrice={constants.getTotalPrice(this.props.cart).toFixed(2)}
          totalAmount={this.getTotalAmount(this.props.cart)}
        />
        <NavHeader />
      </header>
    );
  }
}

const mapStateToProps = ({ cart }) => {
  return {
    cart
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
