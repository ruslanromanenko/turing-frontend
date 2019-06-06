const initialState = {
  products: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const foundIndex = state.products.findIndex(
        product => product.product_id === action.payload
      );
      if (foundIndex === -1) {
        state.products.push({
          product_id: action.payload,
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
