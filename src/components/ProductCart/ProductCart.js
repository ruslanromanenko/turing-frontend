import React from "react";
import classes from "./ProductCart.module.css";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import AmountProduct from "../AmountProduct/AmountProduct";
import ProductPrice from "../ProductPrice/ProductPrice";
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
    <tr className={classes.ProductCart} id={uniqueKey}>
      <td>
        <Button
          variant="contained"
          size="small"
          color="secondary"
          className={classes.buttonRemove}
          onClick={onRemove(uniqueKey)}
        >
          <DeleteIcon className={classes.leftIcon} />
          Delete
        </Button>
      </td>
      <td>
        <p className={classes.ProductName}>{product.name}</p>
      </td>
      <td>
        <p>
          Color: {color}, Size: {size}
        </p>
      </td>
      <td>{<ProductPrice price={price} />}</td>
      <td>
        <AmountProduct
          onAdd={onAdd}
          onSubtract={onSubtract}
          onChange={onChange}
          amount={amount}
          uniqueKey={uniqueKey}
        />
      </td>
      <td>
        <p>{<ProductPrice price={(amount * price).toFixed(2)} />}</p>
      </td>
    </tr>
  );
};
export default ProductCart;
