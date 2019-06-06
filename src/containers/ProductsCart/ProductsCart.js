import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./ProductsCart.module.css";
import ProductCart from "../../components/ProductCart/ProductCart";

class ProductsCart extends Component {
  getProductFromCart(productsInCart) {
    let productsForRender = [];
    for (let i = 0; i < productsInCart.length; i++) {
      productsForRender.push(
        this.props.products.find(product => {
          return productsInCart[i].product_id == product.product_id;
        })
      );
    }
    return productsForRender;
  }

  render() {
    console.log(this.props.cart.products);
    return (
      <div className={classes.ProductsCart}>
        {this.getProductFromCart(this.props.cart.products).length === 0 ? (
          <h2>Cart is empty</h2>
        ) : (
          this.getProductFromCart(this.props.cart.products).map(
            (product, index) => {
              return <ProductCart product={product} key={index} />;
            }
          )
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
