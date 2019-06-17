import React from "react";
import classes from "./ProductPrice.module.css";

const ProductPrice = ({ price, classPrice }) => (
  <span className={classPrice ? classes[classPrice] : "Price"}>
    &pound;{price}
  </span>
);

export default ProductPrice;
