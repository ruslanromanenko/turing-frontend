import React from 'react';
import classes from './ProductPrice.module.css';

const ProductPrice = ({price}) => {
    return (
        <span className={classes.Price}>
            &pound;	{price}
        </span>
    )};
export default ProductPrice