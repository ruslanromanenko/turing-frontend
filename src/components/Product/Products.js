import React from "react";
import classes from "./Product.module.css";
import ProductPrice from "../ProductPrice/ProductPrice";
import ProductDiscountedPrice from "../ProductDiscountedPrice/ProductDiscountedPrice";

const Product = ({ product, onClickProduct }) => {
  let descriptionSliced = product.description.slice(0, 75);
  return (
    <div
      className={classes.Product}
      onClick={onClickProduct}
      id={product.product_id}
    >
      <img
        src={`https://backendapi.turing.com/images/products/${
          product.thumbnail
        }`}
        alt={product.name}
      />
      <h2>{product.name}</h2>
      {product.discounted_price === "0.00" ? (
        <ProductDiscountedPrice price={product.price} />
      ) : (
        <div className={classes.Prices}>
          <ProductPrice price={product.price} />
          <ProductDiscountedPrice price={product.discounted_price} />
        </div>
      )}
      <p className={classes.Description}>
        {descriptionSliced.length < product.description.length
          ? (descriptionSliced += "...")
          : product.description}
      </p>
    </div>
  );
};
export default Product;
