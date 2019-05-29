import axios from "axios";
import { PRODUCTS_FETCHED, PRODUCTS_LOADING } from "../actions/types";

export const fetchProducts = () => dispatch => {
  dispatch({
    type: PRODUCTS_LOADING,
    payload: true
  });
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

export const getCategories = category => ({
  type: "GET_CATEGORIES",
  payload: category
});
