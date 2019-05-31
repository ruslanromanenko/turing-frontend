const initialState = {
  cart: [
    {
      productId: 1,
      amount: 2
    }
  ]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: {}
      };
    default:
      return state;
  }
};
