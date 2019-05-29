import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

export default () => {
  return createStore(rootReducer, applyMiddleware(thunk, logger));
};
