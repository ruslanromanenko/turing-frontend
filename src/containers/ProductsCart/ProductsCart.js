import React, { Component } from "react";
import { connect } from "react-redux";

class ProductsCart extends Component {
  render() {
    return <h1>Product cart</h1>;
  }
}

const mapStateToProps = ({ products }) => {
  return {
    products: products.products,
    isLoading: products.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsCart);
