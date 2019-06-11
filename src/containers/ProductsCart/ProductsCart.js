import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./ProductsCart.module.css";
import ProductCart from "../../components/ProductCart/ProductCart";
import { removingFromCart } from "../../actions";

class ProductsCart extends Component {
  getAttribute(attributes, attributeId) {
    const attribute = attributes.find(
      attribute => attribute.attribute_value_id == attributeId
    );
    return attribute.attribute_value;
  }

  getAmount(productId, colorId, sizeId) {
    const product = this.props.cart.find(product => {
      return (
        product.product.product_id == productId &&
        product.colorId == colorId &&
        product.sizeId == sizeId
      );
    });
    return product.amount;
  }

  clickHandleAdd(evt) {
    console.log(evt.currentTarget.id);
  }
  clickHandleSubtract(evt) {
    console.log(evt.currentTarget.id);
  }

  clickHandleRemove = evt => {
    this.props.removeFromCart(evt.currentTarget.parentElement.id);
  };

  render() {
    return (
      <div className={classes.ProductsCart}>
        {this.props.cart.length === 0 ? (
          <h2>Cart is empty</h2>
        ) : (
          this.props.cart.map((productInCart, index) => {
            const product = productInCart.product;
            console.log(productInCart);
            return (
              <ProductCart
                product={product}
                color={this.getAttribute(
                  product.attributes,
                  productInCart.colorId
                )}
                size={this.getAttribute(
                  product.attributes,
                  productInCart.sizeId
                )}
                key={index + productInCart.key}
                amount={this.getAmount(
                  product.product_id,
                  productInCart.colorId,
                  productInCart.sizeId
                )}
                uniqueKey={productInCart.key}
                onAdd={this.clickHandleAdd}
                onSubtract={this.clickHandleSubtract}
                onRemove={this.clickHandleRemove}
              />
            );
          })
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ cart, products }) => {
  return {
    cart,
    products: products.products
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeFromCart: uniqueKey => dispatch(removingFromCart(uniqueKey))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsCart);
