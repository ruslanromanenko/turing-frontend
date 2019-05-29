import React from "react";
import classes from "./Categories.module.css";
import Filters from "../../components/Filters/Filters";
import Product from "../../components/Product/Products";
import axios from "axios";
import { connect } from "react-redux";
import ProductDetailed from "../../components/ProductDetailed/ProductDetailed";
import Dialog from "@material-ui/core/Dialog";
import { fetchProducts } from "../../actions";

// установить плагин для форматрирования и использовать его prettier
// подключить redux-thunk
// перенести запросы в отдельный файл
// внести правки на мои коментарии
// запрос на получение дополнительных данных по продукту перенести внутрь компонента по продукту

class Categories extends React.Component {
  state = {
    attributesProduct: null,
    currentProduct: null
  };

  handleClose = () => {
    this.setState({ currentProduct: null });
  };

  componentDidMount() {
    this.props.getProducts();
  }

  handleClickProduct = evt => {
    axios
      .get(
        `https://backendapi.turing.com/attributes/inProduct/${
          evt.currentTarget.id
        }`
      )
      .then(({ data }) => {
        this.setState({ attributesProduct: data });
      });

    const currentProduct = this.props.goods.find(product => {
      return product.product_id == evt.currentTarget.id;
    });

    this.setState({ currentProduct: currentProduct });
  };

  render() {
    return (
      <div className={classes.Categories}>
        <Filters />
        <div className={classes.ProductList}>
          {this.props.isLoading
            ? "loading"
            : this.props.goods.map(product => {
                return (
                  <Product
                    product={product}
                    key={product.product_id}
                    onClickProduct={this.handleClickProduct} // TODO name it just onClick
                  />
                );
              })}
          {this.state.currentProduct !== null && (
            <ProductDetailed
              open={this.state.currentProduct !== null}
              onClose={this.handleClose}
              product={this.state.currentProduct}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ goods }) => {
  return {
    goods: goods.goods,
    isLoading: goods.isLoading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(fetchProducts())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories);
