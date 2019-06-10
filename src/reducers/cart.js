const initialState = {
  products: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const indexProduct = state.products.findIndex(
        product =>
          product.productId === action.productId &&
          product.colorId === action.colorId &&
          product.sizeId === action.sizeId
      );
      if (indexProduct === -1) {
        state.products.push({
          productId: action.productId,
          colorId: action.colorId,
          sizeId: action.sizeId,
          amount: 1
        });
      } else {
        ++state.products[indexProduct].amount;
      }
      return state;
    default:
      return state;
  }
};
