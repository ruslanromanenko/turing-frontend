import axios from "axios";
import constants from "../constants";
import {
  PRODUCTS_FETCHED,
  PRODUCTS_LOADING,
  ATTRIBUTES_LOADING,
  ATTRIBUTES_FETCHED,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SUBTRACT_PRODUCT,
  ADD_PRODUCT,
  CHANGE_AMOUNT
} from "../actions/types";

const baseUrl = constants.ServerUrl.baseURL;

export const fetchProducts = () => dispatch => {
  dispatch({
    type: PRODUCTS_LOADING,
    payload: true
  });
  return axios.get(`${baseUrl}products/`).then(
    ({ data }) => {
      dispatch({
        type: PRODUCTS_FETCHED,
        payload: data.rows
      });
    },
    error => {
      // dispatch(apologize('The Sandwich Shop', forPerson, error))
    }
  );
};

export const fetchAttributes = productId => dispatch => {
  dispatch({
    type: ATTRIBUTES_LOADING,
    payload: true
  });
  return axios.get(`${baseUrl}attributes/inProduct/${productId}`).then(
    ({ data }) => {
      dispatch({
        type: ATTRIBUTES_FETCHED,
        payload: data,
        productId: productId
      });
    },
    error => {
      // dispatch(apologize('The Sandwich Shop', forPerson, error))
    }
  );
};

export const addingToCart = (
  productId,
  colorId,
  sizeId,
  product
) => dispatch => {
  return dispatch({
    type: ADD_TO_CART,
    productId,
    colorId,
    sizeId,
    product
  });
};
export const removingFromCart = uniqueKey => dispatch => {
  return dispatch({
    type: REMOVE_FROM_CART,
    uniqueKey
  });
};
export const addingProduct = id => dispatch => {
  return dispatch({
    type: ADD_PRODUCT,
    id
  });
};
export const subtractingProduct = id => dispatch => {
  return dispatch({
    type: SUBTRACT_PRODUCT,
    id
  });
};
export const changeAmountProduct = (id, value) => dispatch => {
  return dispatch({
    type: CHANGE_AMOUNT,
    id,
    value
  });
};
