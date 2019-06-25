import React, { Component } from "react";
import classes from "./App.module.css";
import { Route } from "react-router-dom";
import Products from "./containers/Products/Products";
import Footer from "./components/Footer/Footer";
import ProductsCart from "./containers/ProductsCart/ProductsCart";
import Header from "./containers/Header/Header";

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <main>
          <Route path="/" exact render={() => <h1>Home page</h1>} />
          <Route path="/products" axact component={Products} />
          <Route path="/cart" exact component={ProductsCart} />
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Home;
