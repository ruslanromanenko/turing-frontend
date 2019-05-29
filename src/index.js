import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import createStore from "./store";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const store = createStore();
const aplication = (
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

ReactDOM.render(aplication, document.getElementById("root"));
