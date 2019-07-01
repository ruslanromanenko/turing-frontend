export default {
  getTotalPrice: function(products) {
    console.log(products);
    return products.reduce((acc, productInCart) => {
      const price =
        productInCart.product.discounted_price === "0.00"
          ? productInCart.product.price
          : productInCart.product.discounted_price;
      acc += productInCart.amount * price;
      return acc;
    }, 0);
  }
};
