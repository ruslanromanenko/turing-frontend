import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./ProductsCart.module.css";
import ProductCart from "../../components/ProductCart/ProductCart";
import {
  addingProduct,
  changeAmountProduct,
  removingFromCart,
  subtractingProduct
} from "../../actions";

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

  getTotalPrice(products) {
    return products.reduce((acc, productInCart) => {
      const price =
        productInCart.product.discounted_price === "0.00"
          ? productInCart.product.price
          : productInCart.product.discounted_price;
      acc += productInCart.amount * price;
      return acc;
    }, 0);
  }

  clickHandleAdd = evt => {
    this.props.addProduct(evt.currentTarget.id);
  };

  clickHandleSubtract = evt => {
    this.props.subtractProduct(evt.currentTarget.id);
  };

  clickHandleRemove = key => evt => {
    this.props.removeFromCart(key);
  };

  changeHandleAmount = key => evt => {
    if (evt.currentTarget.value > 0) {
      this.props.changeAmountProduct(key, evt.currentTarget.value);
    }
  };

  render() {
    return (
      <div className={classes.ProductsCart}>
        {this.props.cart.length === 0 ? (
          <h2>Cart is empty</h2>
        ) : (
          <React.Fragment>
            <div className={classes.ProductsCartHead}>
              <p className={classes.TotalPrice}>
                Total: {this.getTotalPrice(this.props.cart).toFixed(2)}
              </p>
            </div>
            <table>
              <thead>
                <tr>
                  <td />
                  <td>Name</td>
                  <td>Attributes</td>
                  <td>Price</td>
                  <td>Quantity</td>
                  <td>Subtotal</td>
                </tr>
              </thead>
              <tbody>
                {this.props.cart.map((productInCart, index) => {
                  const product = productInCart.product;
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
                      onChange={this.changeHandleAmount}
                    />
                  );
                })}
              </tbody>
            </table>
          </React.Fragment>
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
    removeFromCart: uniqueKey => dispatch(removingFromCart(uniqueKey)),
    addProduct: id => dispatch(addingProduct(id)),
    subtractProduct: id => dispatch(subtractingProduct(id)),
    changeAmountProduct: (id, value) => dispatch(changeAmountProduct(id, value))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsCart);
