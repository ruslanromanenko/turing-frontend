import React from "react";
import classes from "./Categories.module.css";
import { connect } from "react-redux";
import ProductDetailsModal from "../ProductDetailsModal/ProductDetailsModal";
import Filters from "../Filters/Filters";
import Product from "../../components/Product/Products";
import TablePagination from "@material-ui/core/TablePagination";
import {
  fetchProducts,
  fetchProductsByCategory,
  fetchProductsByDepartment,
  fetchProductsBySearch
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
      this.props.fetchProducts(
        queryString.stringify({
          page: 1,
          limit: 20,
          ...searchParams
        })
      );
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
      if (searchParams.search) {
        this.props.fetchProductsBySearch(searchParams.search);
      }

      this.props.fetchProducts(
        queryString.stringify({
          ...searchParams
        })
      );
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

  changeSearchParameter(parameter, value) {
    const searchParams = queryString.parse(this.props.location.search);
    searchParams[parameter] = value;
    return queryString.stringify(searchParams);
  }

  handleChangeRowsPerPage = evt => {
    this.props.history.push({
      search: `${this.changeSearchParameter("limit", evt.target.value)}`
    });
  };

  handleChangePage = (evt, page) => {
    console.log(this.queryParams);
    if (page > 0) {
      this.props.history.push({
        search: queryString.stringify({
          ...this.queryParams,
          page
        })
      });
    }
  };

  get queryParams() {
    return queryString.parse(this.props.location.search);
  }

  render() {
    const { page = 1, limit = 20 } = this.queryParams;
    return (
      <div className={classes.Categories}>
        <Filters />
        <div className={classes.ProductList}>
          <div className={classes.Products}>
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
          <TablePagination
            count={this.props.countProducts}
            onChangePage={this.handleChangePage}
            page={parseInt(page)}
            rowsPerPage={parseInt(limit)}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            component="div"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ products }) => {
  return {
    products: products.products,
    countProducts: products.countProducts,
    isLoadingProducts: products.isLoadingProducts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: params => dispatch(fetchProducts(params)),
    fetchProductsByCategory: categoryId =>
      dispatch(fetchProductsByCategory(categoryId)),
    fetchProductsByDepartment: categoryId =>
      dispatch(fetchProductsByDepartment(categoryId)),
    fetchProductsBySearch: queryString =>
      dispatch(fetchProductsBySearch(queryString))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories);
