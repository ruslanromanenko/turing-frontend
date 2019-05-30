import React from "react";
import classes from "./Categories.module.css";
import { connect } from "react-redux";
import ProductDetailed from "../ProductDetailed/ProductDetailed";
import Filters from "../../components/Filters/Filters";
import Product from "../../components/Product/Products";
import { fetchProducts } from "../../actions";

class Categories extends React.Component {
  state = {
    attributesProduct: null,
    selectedProductId: null
  };

  handleClose = () => {
    this.setState({ currentProduct: null });
    this.setState({ selectedProductId: null });
  };

  componentDidMount() {
    this.props.getProducts();
  }

  handleClickProduct = evt => {
    this.setState({ selectedProductId: evt.currentTarget.id });
  };

  render() {
    return (
      <div className={classes.Categories}>
        <Filters />
        <div className={classes.ProductList}>
          {this.props.isLoading
            ? "loading"
            : this.props.products.map(product => {
                return (
                  <Product
                    product={product}
                    key={product.product_id}
                    onClick={this.handleClickProduct} // TODO name it just onClick
                  />
                );
              })}
          {this.state.selectedProductId !== null && (
            <ProductDetailed
              open={this.state.selectedProductId !== null}
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
    isLoading: products.isLoading
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
