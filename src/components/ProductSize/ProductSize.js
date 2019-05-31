import React from "react";
import classes from "./ProductSize.module.css";
import Button from "@material-ui/core/Button";

const ProductSize = ({ size, onClick, id }) => {
  return (
    <Button
      variant="outlined"
      color="secondary"
      className={classes.button}
      id={id}
      onClick={onClick}
    >
      {size}
    </Button>
  );
};
export default ProductSize;
