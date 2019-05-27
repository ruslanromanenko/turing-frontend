import React from 'react';
import classes from './ProductColor.module.css';

const ProductColor = ({color}) => {
    return (
        <div className={`${classes.Color} ${color ? classes[color] : ''}`}></div>
    )};
export default ProductColor