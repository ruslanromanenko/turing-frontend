import React from "react";
import classes from "./Categories.module.css";
import { connect } from "react-redux";
import ProductDetailsModal from "../ProductDetailsModal/ProductDetailsModal";
import Filters from "../../components/Filters/Filters";
import Product from "../../components/Product/Products";
import { fetchProducts } from "../../actions";

class Categories extends React.Component {
  state = {
    selectedProductId: null
  };

  handleClose = () => {
    this.setState({
      selectedProductId: null
    });
  };

  componentDidMount() {
    this.props.fetchProducts();
  }

  handleClickProduct = evt => {
    this.setState({ selectedProductId: evt.currentTarget.id });
  };

  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //   return (
  //     this.props.products.length !== nextProps.products.length ||
  //     this.state.selectedProductId !== nextState.selectedProductId
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
    fetchProducts: () => dispatch(fetchProducts())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories);
