import React from "react";
import classes from "./ProductCart.module.css";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import TextField from "@material-ui/core/TextField";

import ProductPrice from "../ProductPrice/ProductPrice";
import ProductDiscountedPrice from "../ProductDiscountedPrice/ProductDiscountedPrice";

const ProductCart = ({
  product,
  amount,
  color,
  size,
  uniqueKey,
  onRemove,
  onAdd,
  onSubtract,
  onChange
}) => {
  const price =
    product.discounted_price === "0.00"
      ? product.price
      : product.discounted_price;
  return (
    <div className={classes.ProductCart} id={uniqueKey}>
      <Button
        variant="contained"
        size="small"
        color="secondary"
        className={classes.buttonRemove}
        onClick={onRemove}
      >
        <DeleteIcon className={classes.leftIcon} />
        Delete
      </Button>
      <p className={classes.ProductName}>{product.name}</p>
      <p>
        Color: {color}, Size: {size}
      </p>
      <p>{price}</p>
      <div>
        <Button
          className={classes.buttonSubtract}
          variant="contained"
          size="small"
          color="secondary"
          onClick={onSubtract}
          id={`sub_${uniqueKey}`}
        >
          <RemoveIcon />
        </Button>
        <TextField
          id={`change_${uniqueKey}`}
          value={amount}
          onChange={onChange(uniqueKey)}
          type="number"
          className={classes.AmountProducts}
        />
        <Button
          onClick={onAdd}
          variant="contained"
          size="small"
          className={classes.buttonAdd}
          color="secondary"
          id={`add_${uniqueKey}`}
        >
          <AddIcon />
        </Button>
      </div>
      <p>{Math.round(amount * price)}</p>
    </div>
  );
};
export default ProductCart;
