const constants = {
  ServerUrl: {
    baseURL: "https://backendapi.turing.com/"
  },
  getTotalPrice: function(products) {
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

export default constants;
