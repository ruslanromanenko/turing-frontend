import React from "react";
import classes from "./ProductCart.module.css";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import TextField from "@material-ui/core/TextField";

import ProductPrice from "../ProductPrice/ProductPrice";
import ProductDiscountedPrice from "../ProductDiscountedPrice/ProductDiscountedPrice";

const ProductCart = ({ product, onClick, attributes, amount }) => {
  return (
    <div
      className={classes.ProductCart}
      onClick={onClick}
      id={product.productId}
    >
      <Button
        variant="contained"
        size="small"
        color="secondary"
        className={classes.buttonRemove}
      >
        <DeleteIcon className={classes.leftIcon} />
        Delete
      </Button>
      <p className={classes.ProductName}>{product.name}</p>
      <p>
        Color: {attributes.color}, Size: {attributes.size}
      </p>
      <p>{product.price}</p>
      <div>
        <Button
          className={classes.buttonSubtract}
          variant="contained"
          size="small"
          color="secondary"
        >
          <RemoveIcon />
        </Button>
        <TextField
          id="filled-number"
          value={amount}
          // onChange={handleChange("age")}
          type="number"
          className={classes.AmountProducts}
        />
        <Button
          variant="contained"
          size="small"
          className={classes.buttonAdd}
          color="secondary"
        >
          <AddIcon />
        </Button>
      </div>
      <p>Subtotal</p>
    </div>
  );
};
export default ProductCart;
