import {
  PRODUCTS_FETCHED,
  PRODUCTS_LOADING,
  ATTRIBUTES_FETCHED,
  ATTRIBUTES_LOADING
} from "../actions/types";

const initialState = {
  isLoading: false,
  products: [],
  openedProductId: null
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
        products: action.payload,
        isLoading: false
      };
    case ATTRIBUTES_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case ATTRIBUTES_FETCHED:
      const foundIndex = state.products.findIndex(
        product => product.product_id == action.productId
      );
      state.products[foundIndex].attributes = action.payload;
      return {
        ...state,
        openedProductId: action.productId,
        isLoading: false
      };
    default:
      return state;
  }
};
