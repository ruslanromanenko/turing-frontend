import React from "react";
import classes from "./Product.module.css";
import ProductPrice from "../ProductPrice/ProductPrice";
import constants from "../../constants";

const Product = ({ product, onClick }) => {
  let descriptionSliced = product.description.slice(0, 75);
  return (
    <div className={classes.Product} onClick={onClick} id={product.product_id}>
      <img
        src={`${constants.ServerUrl.baseURL}images/products/${
          product.thumbnail
        }`}
        alt={product.name}
      />
      <h2>{product.name}</h2>
      {product.discounted_price === "0.00" ? (
        <ProductPrice price={product.price} classPrice="ProductPrice" />
      ) : (
        <div className={classes.Prices}>
          <ProductPrice price={product.price} classPrice="OldProductPrice" />
          <ProductPrice
            price={product.discounted_price}
            classPrice="ProductPrice"
          />
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
