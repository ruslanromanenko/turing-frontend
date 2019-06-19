import React, { Component } from "react";
import classes from "./App.module.css";
import { Route } from "react-router-dom";
import Categories from "./containers/Categories/Categories";
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
          <Route path="/categories" axact component={Categories} />
          <Route path="/cart" exact component={ProductsCart} />
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Home;
