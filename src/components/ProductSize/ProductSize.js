import React from "react";
import classes from "./ProductSize.module.css";
import Button from "@material-ui/core/Button";

const ProductSize = ({ size, onClick, id, active }) => {
  return (
    <Button
      variant="outlined"
      color="secondary"
      className={`${id == active && classes.Active}`}
      id={id}
      onClick={onClick}
    >
      {size}
    </Button>
  );
};
export default ProductSize;

// className={`${classes.Color} ${color && classes[color]} ${id == active &&
// classes.Active}`}
