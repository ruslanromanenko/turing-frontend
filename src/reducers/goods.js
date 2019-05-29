import { PRODUCTS_FETCHED, PRODUCTS_LOADING } from "../actions/types";

const initialState = {
  isLoading: false,
  goods: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case PRODUCTS_FETCHED:
      return {
        ...state,
        goods: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
};
