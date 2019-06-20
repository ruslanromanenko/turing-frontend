import React from "react";
import classes from "./Categories.module.css";
import { connect } from "react-redux";
import ProductDetailsModal from "../ProductDetailsModal/ProductDetailsModal";
import Filters from "../Filters/Filters";
import Product from "../../components/Product/Products";
import {
  fetchProducts,
  fetchProductsByCategory,
  fetchProductsByDepartment
} from "../../actions";
import * as queryString from "query-string";

class Categories extends React.Component {
  state = {
    selectedProductId: null
  };

  componentDidMount() {
    const searchParams = queryString.parse(this.props.location.search);
    if (searchParams.category) {
      this.props.fetchProductsByCategory(searchParams.category);
    } else {
      this.props.fetchProducts();
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const searchParams = queryString.parse(nextProps.location.search);
    if (nextProps.location.search !== this.props.location.search) {
      if (searchParams.category) {
        this.props.fetchProductsByCategory(searchParams.category);
      }
      if (searchParams.department) {
        this.props.fetchProductsByDepartment(searchParams.department);
      }
    }
  }

  handleClose = () => {
    this.setState({
      selectedProductId: null
    });
  };

  handleClickProduct = evt => {
    this.setState({ selectedProductId: evt.currentTarget.id });
  };

  render() {
    return (
      <div className={classes.Categories}>
        <Filters />
        <div className={classes.ProductList}>
          {this.props.isLoadingProducts
            ? "Loading product"
            : this.props.products.map(product => {
                return (
                  <Product
                    product={product}
                    key={product.product_id}
                    onClick={this.handleClickProduct}
                  />
                );
              })}
          {this.state.selectedProductId !== null && (
            <ProductDetailsModal
              onClose={this.handleClose}
              productId={this.state.selectedProductId}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ products }) => {
  return {
    products: products.products,
    isLoadingProducts: products.isLoadingProducts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    fetchProductsByCategory: categoryId =>
      dispatch(fetchProductsByCategory(categoryId)),
    fetchProductsByDepartment: categoryId =>
      dispatch(fetchProductsByDepartment(categoryId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories);
