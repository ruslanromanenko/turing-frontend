import React from "react";
import classes from "./ProductDetailed.module.css";
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

// TODO maybe it would be better call that classname ProductDetailsModal
class ProductDetailed extends React.Component {
  state = {
    colorId: null,
    sizeId: null
  };

  componentDidMount() {
    // TODO it would be better to call getAttributes as fetchAttributes as we are fetching them from server
    this.props.getAttributes(this.props.productId);
  }

  getColors = attributes => {
    if (attributes) {
      // TODO you can avoid using secong return here
      // return attributes.filter(attribute => attribute.attribute_name === "Color");
      return attributes.filter(attribute => {
        return attribute.attribute_name === "Color";
      });
    }
    return [];
  };
  getSizes = attributes => {
    if (attributes) {
      // TODO here you can also remove secong return
      return attributes.filter(attribute => {
        return attribute.attribute_name === "Size";
      });
    }
    return [];
  };

  handleAddToCart = evt => {
    this.props.addToCart(evt.currentTarget.id);
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
    // TODO I would call it productIndex
    const foundIndex = this.props.products.findIndex(
      product => product.product_id == this.props.productId
    );
    const product = this.props.products[foundIndex];
    return (
      <Dialog open onClose={this.props.onClose}>
        <div className={classes.ProductDetailed}>
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
                src={`https://backendapi.turing.com/images/products/${
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
                            active={this.state.color_id}
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
                            active={this.state.size_id}
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
                id={this.props.product_id}
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
    getAttributes: product_id => dispatch(fetchAttributes(product_id)),
    addToCart: (product_id, color_id, size_id) =>
      dispatch(addingToCart(product_id, color_id, size_id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetailed);
