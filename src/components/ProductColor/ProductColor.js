import React from "react";
import classes from "./ProductColor.module.css";

const ProductColor = ({ color, id, onClick, active }) => {
  return (
    <div
      className={`${classes.Color} ${color && classes[color]} ${id == active &&
        classes.Active}`}
      id={id}
      onClick={onClick}
    />
  );
};
export default ProductColor;
