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
import ProductColor from "../../components/ProductColor/ProductColor";
import ProductSize from "../../components/ProductSize/ProductSize";
import { fetchAttributes, addingToCart, generationCart } from "../../actions";
import Button from "@material-ui/core/Button/index";
import constants from "../../constants";
import { Link } from "react-router-dom";

class ProductDetailsModal extends React.Component {
  state = {
    colorId: null,
    sizeId: null,
    isAdded: false
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
    this.props.addToCart({
      productId: evt.currentTarget.id,
      colorId: this.state.colorId,
      sizeId: this.state.sizeId,
      product: this.getProduct()
    });
    this.setState({
      colorId: null,
      sizeId: null,
      isAdded: true
    });

    this.props.generateCart();
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
  handleСontinueShopping = () => {
    this.props.onClose();
    this.setState({
      isAdded: true
    });
  };
  handleGoToCart = () => {
    this.props.onClose();
    this.setState({
      isAdded: true
    });
  };

  getProduct() {
    const productIndex = this.props.products.findIndex(
      product => product.product_id == this.props.productId
    );
    return this.props.products[productIndex];
  }

  render() {
    const AdapterLink = React.forwardRef((props, ref) => (
      <Link innerRef={ref} to="/getting-started/installation/" {...props} />
    ));
    const product = this.getProduct();
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
                <ProductPrice price={product.price} classPrice="ProductPrice" />
              ) : (
                <div className={classes.Prices}>
                  <ProductPrice
                    price={product.price}
                    classPrice="OldProductPrice"
                  />
                  <ProductPrice
                    price={product.discounted_price}
                    classPrice="ProductPrice"
                  />
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
              {this.state.isAdded ? (
                <div className={classes.Controls}>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.GoToCart}
                    onClick={this.handleGoToCart}
                    id={`go_to_cart_${this.props.productId}`}
                    to="/cart"
                    component={AdapterLink}
                  >
                    Go to Cart
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.СontinueShopping}
                    onClick={this.handleСontinueShopping}
                    id={`continue_${this.props.productId}`}
                  >
                    Сontinue
                  </Button>
                </div>
              ) : (
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
              )}
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
    addToCart: details => dispatch(addingToCart(details)),
    generateCart: () => dispatch(generationCart())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetailsModal);
