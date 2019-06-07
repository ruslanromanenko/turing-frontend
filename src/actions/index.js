import axios from "axios";
import {
  PRODUCTS_FETCHED,
  PRODUCTS_LOADING,
  ATTRIBUTES_LOADING,
  ATTRIBUTES_FETCHED,
  ADD_TO_CART
} from "../actions/types";

export const fetchProducts = () => dispatch => {
  dispatch({
    type: PRODUCTS_LOADING,
    payload: true
  });
  // TODO make it more common, means need to move api url to constants and use in separte places
  return axios.get("https://backendapi.turing.com/products/").then(
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

export const fetchAttributes = product_id => dispatch => {
  dispatch({
    type: ATTRIBUTES_LOADING,
    payload: true
  });
  return axios
    .get(`https://backendapi.turing.com/attributes/inProduct/${product_id}`)
    .then(
      ({ data }) => {
        dispatch({
          type: ATTRIBUTES_FETCHED,
          payload: data,
          product_id: product_id
        });
      },
      error => {
        // dispatch(apologize('The Sandwich Shop', forPerson, error))
      }
    );
};

export const addingToCart = (product_id, color_id, size_id) => dispatch => {
  return dispatch({
    type: ADD_TO_CART,
    product_id: product_id,
    color_id: color_id,
    size_id: size_id
  });
};
