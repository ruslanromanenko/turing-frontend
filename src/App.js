import React, { Component } from "react";
import MainHeader from "./components/MainHeader/MainHeader";
import NavHeader from "./components/NavHeader/NavHeader";
import classes from "./App.module.css";
import { Route } from "react-router-dom";
import Categories from "./containers/Categories/Categories";
import Footer from "./components/Footer/Footer";
import ProductsCart from "./containers/ProductsCart/ProductsCart";

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <header className={classes.Header}>
          <MainHeader />
          <NavHeader />
        </header>
        <main>
          <Route path="/" exact render={() => <h1>Home page</h1>} />
          <Route path="/categories" component={Categories} />
          <Route path="/cart" component={ProductsCart} />
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Home;
