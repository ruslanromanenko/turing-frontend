import {
  PRODUCTS_FETCHED,
  PRODUCTS_LOADING,
  ATTRIBUTES_FETCHED,
  ATTRIBUTES_LOADING
} from "../actions/types";

const initialState = {
  isLoadingProducts: false,
  isLoadingAttributes: false,
  products: [],
  openedproductId: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTS_LOADING:
      return {
        ...state,
        isLoadingProducts: action.payload
      };
    case PRODUCTS_FETCHED:
      return {
        ...state,
        products: action.payload,
        isLoadingProducts: false
      };
    case ATTRIBUTES_LOADING:
      return {
        ...state,
        isLoadingAttributes: action.payload
      };
    case ATTRIBUTES_FETCHED:
      const foundIndex = state.products.findIndex(
        product => product.product_id == action.productId
      );
      state.products[foundIndex].attributes = action.payload;

      return {
        ...state,
        openedproductId: action.productId,
        isLoadingAttributes: false
      };
    default:
      return state;
  }
};
