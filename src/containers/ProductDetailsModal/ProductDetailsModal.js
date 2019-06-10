import React from "react";
import classes from "./ProductDetailsModal.module.css";
import DialogTitle from "@material-ui/core/DialogTitle/index";
import DialogContent from "@material-ui/core/DialogContent/index";
import Dialog from "@material-ui/core/Dialog/index";
import IconButton from "@material-ui/core/IconButton/index";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography/index";
import { connect } from "react-redux";
import ProductPrice from "../../components/ProductPrice/ProductPrice";
import ProductDiscountedPrice from "../../components/ProductDiscountedPrice/ProductDiscountedPrice";
import ProductColor from "../../components/ProductColor/ProductColor";
import ProductSize from "../../components/ProductSize/ProductSize";
import { fetchAttributes, addingToCart } from "../../actions";
import Button from "@material-ui/core/Button/index";
import constants from "../../constants";

class ProductDetailsModal extends React.Component {
  state = {
    colorId: null,
    sizeId: null
  };

  componentDidMount() {
    this.props.fetchAttributes(this.props.productId);
  }

  getColors = attributes => {
    if (attributes) {
      return attributes.filter(
        attribute => attribute.attribute_name === "Color"
      );
    }
    return [];
  };
  getSizes = attributes => {
    if (attributes) {
      return attributes.filter(
        attribute => attribute.attribute_name === "Size"
      );
    }
    return [];
  };

  handleAddToCart = evt => {
    this.props.addToCart(
      evt.currentTarget.id,
      this.state.colorId,
      this.state.sizeId
    );
    this.setState({
      colorId: null,
      sizeId: null
    });
  };

  handleSelectColor = evt => {
    this.setState({
      colorId: evt.currentTarget.id
    });
  };

  handleSelectSize = evt => {
    this.setState({
      sizeId: evt.currentTarget.id
    });
  };
  render() {
    const productIndex = this.props.products.findIndex(
      product => product.product_id == this.props.productId
    );
    const product = this.props.products[productIndex];
    return (
      <Dialog open onClose={this.props.onClose}>
        <div className={classes.ProductDetailsModal}>
          <DialogTitle
            id="customized-dialog-title"
            onClose={this.props.onClose}
          >
            <IconButton
              aria-label="Close"
              className={classes.closeButton}
              onClick={this.props.onClose}
            >
              <CloseIcon />
            </IconButton>
            {product.name}
          </DialogTitle>
          <DialogContent className={classes.DialogContent}>
            <div className={classes.imageBlock}>
              <img
                src={`${constants.ServerUrl.baseURL}images/products/${
                  product.thumbnail
                }`}
                alt={product.name}
              />
            </div>
            <div className={classes.contentBlock}>
              {product.discounted_price === "0.00" ? (
                <ProductDiscountedPrice price={product.price} />
              ) : (
                <div className={classes.Prices}>
                  <ProductPrice price={product.price} />
                  <ProductDiscountedPrice price={product.discounted_price} />
                </div>
              )}
              <Typography>{product.description}</Typography>
              <div className={classes.ColorsBlock}>
                <h3>Color</h3>
                <div className={classes.Colors}>
                  {this.props.isLoadingAttributes
                    ? "loading"
                    : this.getColors(product.attributes).map((color, index) => {
                        return (
                          <ProductColor
                            color={color.attribute_value}
                            id={color.attribute_value_id}
                            key={index}
                            onClick={this.handleSelectColor}
                            active={this.state.colorId}
                          />
                        );
                      })}
                </div>
              </div>
              <div className={classes.SizesBlock}>
                <h3>Size</h3>
                <div className={classes.Sizes}>
                  {this.props.isLoadingAttributes
                    ? "loading"
                    : this.getSizes(product.attributes).map((size, index) => {
                        return (
                          <ProductSize
                            size={size.attribute_value}
                            key={index}
                            onClick={this.handleSelectSize}
                            id={size.attribute_value_id}
                            active={this.state.sizeId}
                          />
                        );
                      })}
                </div>
              </div>
              <Button
                variant="contained"
                color="secondary"
                className={classes.AddToCart}
                onClick={this.handleAddToCart}
                id={this.props.productId}
                disabled={!this.state.sizeId || !this.state.colorId}
              >
                Add to Cart
              </Button>
            </div>
          </DialogContent>
        </div>
      </Dialog>
    );
  }
}

const mapStateToProps = ({ products }) => {
  return {
    products: products.products,
    isLoadingAttributes: products.isLoadingAttributes
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchAttributes: productId => dispatch(fetchAttributes(productId)),
    addToCart: (productId, colorId, sizeId) =>
      dispatch(addingToCart(productId, colorId, sizeId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetailsModal);
