import { combineReducers } from "redux";
import products from "./products";
import categories from "./categories";
import departments from "./departments";
import cart from "./cart";

export default combineReducers({
  categories,
  departments,
  products,
  cart
});
