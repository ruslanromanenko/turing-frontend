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
          return productsInCart[i].productId == product.product_id;
        })
      );
    }
    return productsForRender;
  }

  getAttributeValue(attributeId, attributes) {
    const attribute = attributes.find(
      attribute => attribute.attribute_value_id == attributeId
    );
    return attribute.attribute_value;
  }

  getAttributes(productId) {
    const productCart = this.props.cart.products.find(
      product => product.productId == productId
    );
    const product = this.props.products.find(
      product => product.product_id == productId
    );

    const color = this.getAttributeValue(
      productCart.colorId,
      product.attributes
    );
    const size = this.getAttributeValue(productCart.sizeId, product.attributes);
    return { color, size };
  }

  getAmount(productId) {
    const product = this.props.cart.products.find(
      product => product.productId == productId
    );
    return product.amount;
  }

  render() {
    // console.log(this.props.cart);
    return (
      <div className={classes.ProductsCart}>
        {this.getProductFromCart(this.props.cart.products).length === 0 ? (
          <h2>Cart is empty</h2>
        ) : (
          this.getProductFromCart(this.props.cart.products).map(
            (product, index) => {
              return (
                <ProductCart
                  product={product}
                  attributes={this.getAttributes(product.product_id)}
                  key={index}
                  amount={this.getAmount(product.product_id)}
                />
              );
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
