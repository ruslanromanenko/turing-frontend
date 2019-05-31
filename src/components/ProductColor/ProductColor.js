import React from "react";
import classes from "./ProductColor.module.css";

const ProductColor = ({ color, id, onClick }) => {
  return (
    <div
      className={`${classes.Color} ${color ? classes[color] : ""}`}
      id={id}
      onClick={onClick}
    />
  );
};
export default ProductColor;
