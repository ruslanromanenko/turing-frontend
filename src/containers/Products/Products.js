import React from "react";
import classes from "./Products.module.css";
import { connect } from "react-redux";
import ProductDetailsModal from "../ProductDetailsModal/ProductDetailsModal";
import Filters from "../Filters/Filters";
import Product from "../../components/Product/Products";
import ReactPaginate from "react-paginate";
import NavigateNext from "@material-ui/icons/NavigateNext";
import NavigateBefore from "@material-ui/icons/NavigateBefore";

import {
  fetchProducts,
  fetchProductsByCategory,
  fetchProductsByDepartment,
  fetchProductsBySearch
} from "../../actions";
import * as queryString from "query-string";

class Products extends React.Component {
  state = {
    selectedProductId: null,
    limit: 5
  };

  componentWillUpdate(nextProps, nextState) {
    const searchParams = queryString.parse(nextProps.location.search);
    if (
      nextProps.location.search !== this.props.location.search ||
      nextProps.location.pathname !== this.props.location.pathname
    ) {
      if (searchParams.category) {
        this.props.fetchProductsByCategory(searchParams.category);
      } else if (this.props.location.pathname.includes("department")) {
        const pathElements = this.props.location.pathname.split("/");

        const departmentId = pathElements[pathElements.length - 1];

        this.props.fetchProductsByDepartment(
          departmentId,
          queryString.stringify({ ...searchParams })
        );
      } else if (searchParams.query_string) {
        this.props.fetchProductsBySearch(
          queryString.stringify({ ...searchParams })
        );
      } else {
        this.props.fetchProducts(queryString.stringify({ ...searchParams }));
      }
    }
  }

  componentDidMount() {
    const searchParams = queryString.parse(this.props.location.search);
    if (searchParams.category) {
      this.props.fetchProductsByCategory(searchParams.category);
    } else {
      this.props.fetchProducts(
        queryString.stringify({
          page: 1,
          limit: this.state.limit,
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

  handleChangePage = page => {
    this.props.history.push({
      search: queryString.stringify({
        ...this.queryParams,
        limit: 5,
        page: ++page.selected
      })
    });
  };

  get queryParams() {
    return queryString.parse(this.props.location.search);
  }

  render() {
    return (
      <div className={classes.ProductsBlock}>
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
          {this.props.countProducts > this.state.limit && (
            <ReactPaginate
              previousLinkClassName={classes.previous}
              previousLabel={<NavigateBefore />}
              nextLinkClassName={classes.next}
              nextLabel={<NavigateNext />}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={this.props.countProducts / this.state.limit}
              marginPagesDisplayed={2}
              pageRangeDisplayed={2}
              onPageChange={this.handleChangePage}
              containerClassName={classes.Pagination}
              subContainerClassName={"pages pagination"}
              activeClassName={classes.Active}
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
    countProducts: products.countProducts,
    isLoadingProducts: products.isLoadingProducts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: searchParams => dispatch(fetchProducts(searchParams)),
    fetchProductsByCategory: categoryId =>
      dispatch(fetchProductsByCategory(categoryId)),
    fetchProductsByDepartment: (departmentId, searchParams) =>
      dispatch(fetchProductsByDepartment(departmentId, searchParams)),
    fetchProductsBySearch: searchParams =>
      dispatch(fetchProductsBySearch(searchParams))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
