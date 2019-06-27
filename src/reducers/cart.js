import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SUBTRACT_PRODUCT,
  ADD_PRODUCT,
  CHANGE_AMOUNT
} from "../actions/types";
const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const isContains = state.find(product => {
        return (
          product.product.product_id === action.product.product_id &&
          product.colorId === action.colorId &&
          product.sizeId === action.sizeId
        );
      });

      if (isContains !== undefined) {
        return state.map(product => {
          if (
            product.product.product_id === action.product.product_id &&
            product.colorId === action.colorId &&
            product.sizeId === action.sizeId
          ) {
            return {
              ...product,
              amount: ++product.amount
            };
          }
          return product;
        });
      }
      return [
        ...state,
        {
          colorId: action.colorId,
          sizeId: action.sizeId,
          amount: 1,
          product: action.product,
          key: `${action.product.product_id}_${action.colorId}_${action.sizeId}`
        }
      ];
    case REMOVE_FROM_CART:
      return state.filter(product => {
        return product.key !== action.uniqueKey;
      });
    case ADD_PRODUCT:
      return state.map(product => {
        if (action.id.includes(product.key)) {
          return {
            ...product,
            amount: ++product.amount
          };
        }
        return product;
      });
    case SUBTRACT_PRODUCT:
      return state.map(product => {
        if (action.id.includes(product.key) && product.amount > 1) {
          return {
            ...product,
            amount: --product.amount
          };
        }
        return product;
      });
    case CHANGE_AMOUNT:
      return state.map(product => {
        if (action.id == product.key) {
          // TODO make === do not use ==
          return {
            ...product,
            amount: parseInt(action.value)
          };
        }
        return product;
      });
    default:
      return state;
  }
};
