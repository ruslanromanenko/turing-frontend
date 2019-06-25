import { combineReducers } from "redux";
import categories from "./categories";
import products from "./products";
import departments from "./departments";
import cart from "./cart";

export default combineReducers({
  categories,
  departments,
  products,
  cart
});
