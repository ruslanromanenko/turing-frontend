import React from 'react';
import classes from './ProductDiscountedPrice.module.css';

const ProductDiscountedPrice = ({price}) => {
    return (
        <span className={classes.DiscountedPrice}>
            &pound;	{price}
        </span>
    )};
export default ProductDiscountedPrice