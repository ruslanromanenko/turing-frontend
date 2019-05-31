const initialState = {
  category: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_CATEGORIES":
      return {
        ...state,
        cart: action.payload
      };
    default:
      return state;
  }
};
