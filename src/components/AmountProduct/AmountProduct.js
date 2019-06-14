import React from "react";
import classes from "./AmountProduct.module.css";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import TextField from "@material-ui/core/TextField";

const AmountProduct = ({ amount, uniqueKey, onAdd, onSubtract, onChange }) => {
  return (
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
  );
};
export default AmountProduct;
