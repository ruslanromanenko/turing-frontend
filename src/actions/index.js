import axios from "axios";

export const fetchProducts = () => dispatch => {
  return axios.get("https://backendapi.turing.com/products/").then(
    ({ data }) => {
      dispatch({
        type: "PRODUCTS_FETCHING",
        payload: data.rows
      });
    },
    error => {
      // dispatch(apologize('The Sandwich Shop', forPerson, error))
    }
  );
};
