import {
  PRODUCTS_FETCHED,
  PRODUCTS_LOADING,
  ATTRIBUTES_FETCHED,
  ATTRIBUTES_LOADING,
  FETCH_PRODUCT_BY_CATEGORY,
  FETCH_PRODUCT_BY_DEPARTMENT
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
    case FETCH_PRODUCT_BY_CATEGORY:
      return {
        ...state,
        products: action.payload,
        isLoadingProducts: false
      };
    case FETCH_PRODUCT_BY_DEPARTMENT:
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
      const products = state.products.map(product => {
        if (product.product_id == action.productId) {
          return {
            ...product,
            attributes: action.payload
          };
        }
        return product;
      });
      return {
        ...state,
        products,
        openedproductId: action.productId,
        isLoadingAttributes: false
      };
    default:
      return state;
  }
};
