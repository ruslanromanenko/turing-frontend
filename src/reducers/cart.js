const initialState = {
  products: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const foundIndex = state.products.findIndex(
        product =>
          product.product_id === action.product_id &&
          product.color_id === action.color_id &&
          product.size_id === action.size_id
      );
      if (foundIndex === -1) {
        state.products.push({
          product_id: action.product_id,
          color_id: action.color_id,
          size_id: action.size_id,
          amount: 1
        });
      } else {
        ++state.products[foundIndex].amount;
      }
      return state;
    default:
      return state;
  }
};
