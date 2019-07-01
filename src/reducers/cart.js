import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SUBTRACT_PRODUCT,
  ADD_PRODUCT,
  CHANGE_AMOUNT,
  GENERATION_CART
} from "../actions/types";
const initialState = { cartId: null, products: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const isContains = state.products.find(
        product =>
          product.product.product_id === action.payload.product.product_id &&
          product.colorId === action.payload.colorId &&
          product.sizeId === action.payload.sizeId
      );
      if (isContains !== undefined) {
        return state.products.map(product => {
          if (
            product.product.product_id === action.payload.product.product_id &&
            product.colorId === action.payload.colorId &&
            product.sizeId === action.payload.sizeId
          ) {
            return {
              ...product,
              amount: ++product.amount
            };
          }
          return product;
        });
      }
      return {
        ...state,
        products: [
          ...state.products,
          {
            colorId: action.payload.colorId,
            sizeId: action.payload.sizeId,
            amount: 1,
            product: action.payload.product,
            key: `${action.payload.product.product_id}_${
              action.payload.colorId
            }_${action.payload.sizeId}`
          }
        ]
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        products: state.products.filter(product => {
          return product.key !== action.uniqueKey;
        })
      };
    case GENERATION_CART:
      // return [...state, { cartId: action.payload.cart_id }];
      return state;
    case ADD_PRODUCT:
      return {
        ...state,
        products: state.products.map(product => {
          if (action.id.includes(product.key)) {
            return {
              ...product,
              amount: ++product.amount
            };
          }
          return product;
        })
      };
    case SUBTRACT_PRODUCT:
      return {
        ...state,
        products: state.products.map(product => {
          if (action.id.includes(product.key) && product.amount > 1) {
            return {
              ...product,
              amount: --product.amount
            };
          }
          return product;
        })
      };
    case CHANGE_AMOUNT:
      return {
        ...state,
        products: state.products.map(product => {
          if (action.id === product.key) {
            return {
              ...product,
              amount: parseInt(action.value)
            };
          }
          return product;
        })
      };
    default:
      return state;
  }
};
