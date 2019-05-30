import React from "react";
import classes from "./ProductSize.module.css";
import Button from "@material-ui/core/Button";

const ProductSize = ({ size }) => {
  return (
    <Button variant="outlined" color="secondary" className={classes.button}>
      {size}
    </Button>
  );
};
export default ProductSize;
