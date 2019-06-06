import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./ProductsCart.module.css";
import ProductCart from "../../components/ProductCart/ProductCart";

class ProductsCart extends Component {
  render() {
    const productsInCart = this.props.cart.products;
    let productsForRender = [];
    for (let i = 0; i < productsInCart.length; i++) {
      productsForRender.push(
        this.props.products.find(product => {
          return productsInCart[i].product_id == product.product_id;
        })
      );
    }

    return (
      <div className={classes.ProductsCart}>
        {productsForRender.length === 0 ? (
          <h2>Cart is empty</h2>
        ) : (
          productsForRender.map((product, index) => {
            console.log(product);
            return <ProductCart product={product} key={index} />;
          })
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ cart, products }) => {
  return {
    cart: cart,
    products: products.products
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsCart);
