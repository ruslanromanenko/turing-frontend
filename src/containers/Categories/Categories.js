import React from "react";
import classes from "./Categories.module.css";
import { connect } from "react-redux";
import ProductDetailed from "../ProductDetailed/ProductDetailed";
import Filters from "../../components/Filters/Filters";
import Product from "../../components/Product/Products";
import { fetchProducts } from "../../actions";

class Categories extends React.Component {
  state = {
    selectedproduct_id: null
  };

  handleClose = () => {
    this.setState({
      selectedproduct_id: null
    });
  };

  componentDidMount() {
    this.props.getProducts();
  }

  handleClickProduct = evt => {
    this.setState({ selectedproduct_id: evt.currentTarget.id });
  };

  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //   return (
  //     this.props.products.length !== nextProps.products.length ||
  //     this.state.selectedproduct_id !== nextState.selectedproduct_id
  //   );
  // }

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
          {this.state.selectedproduct_id !== null && (
            <ProductDetailed
              open={this.state.selectedproduct_id !== null}
              onClose={this.handleClose}
              product_id={this.state.selectedproduct_id}
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
    getProducts: () => dispatch(fetchProducts())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories);
