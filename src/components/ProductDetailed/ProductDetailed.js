import React from "react";
import classes from "./ProductDetailed.module.css";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import ProductPrice from "../ProductPrice/ProductPrice";
import ProductDiscountedPrice from "../ProductDiscountedPrice/ProductDiscountedPrice";
import ProductColor from "../ProductColor/ProductColor";
import ProductSize from "../ProductSize/ProductSize";

class ProductDetailed extends React.Component {
  getColors = attributes => {
    if (attributes) {
      return attributes.filter(attribute => {
        // console.log(attribute)
        return attribute.attribute_name === "Color";
      });
    }
  };
  getSizes = attributes => {
    if (attributes) {
      return attributes.filter(attribute => {
        return attribute.attribute_name === "Size";
      });
    }
  };
  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>
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
            {this.props.product.name}
          </DialogTitle>
          <DialogContent className={classes.DialogContent}>
            <div className={classes.imageBlock}>
              <img
                src={`https://backendapi.turing.com/images/products/${
                  this.props.product.thumbnail
                }`}
                alt={this.props.product.name}
              />
            </div>
            <div className={classes.contentBlock}>
              {this.props.product.discounted_price === "0.00" ? (
                <ProductDiscountedPrice price={this.props.product.price} />
              ) : (
                <div className={classes.Prices}>
                  <ProductPrice price={this.props.product.price} />
                  <ProductDiscountedPrice
                    price={this.props.product.discounted_price}
                  />
                </div>
              )}
              <Typography>{this.props.product.description}</Typography>
              <div className={classes.ColorsBlock}>
                <h3>Color</h3>
                <div className={classes.Colors}>
                  {this.props.colors
                    ? this.props.colors.map((color, index) => {
                        return (
                          <ProductColor
                            color={color.attribute_value}
                            key={index}
                          />
                        );
                      })
                    : null}
                </div>
              </div>
              <div className={classes.SizesBlock}>
                <h3>Size</h3>
                <div className={classes.Sizes}>
                  {this.props.sizes
                    ? this.props.sizes.map((size, index) => {
                        console.log(size.attribute_value);
                        return (
                          <ProductSize
                            size={size.attribute_value}
                            key={index}
                          />
                        );
                      })
                    : null}
                </div>
              </div>
            </div>
          </DialogContent>
        </div>
      </Dialog>
    );
  }
}

export default ProductDetailed;
