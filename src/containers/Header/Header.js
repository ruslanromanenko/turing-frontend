import React from "react";
import classes from "./Header.module.css";
import { connect } from "react-redux";
import MainHeader from "../../components/MainHeader/MainHeader";
import NavHeader from "../../components/NavHeader/NavHeader";
import utils from "../../utils";
import { fetchDepartments } from "../../actions";
import * as queryString from "query-string";
import { withRouter } from "react-router-dom";

class Header extends React.Component {
  handleClickSearch = evt => {
    const searchParams = queryString.parse(this.props.location.search);
    this.props.history.replace({
      pathname: `/products/search`,
      search: queryString.stringify({
        ...searchParams,
        page: 1,
        query_string: evt.currentTarget.ownerDocument.all.inputSearch.value
      })
    });
  };

  handleKeyPressEnter = evt => {
    if (evt.charCode == 13) {
      this.handleClickSearch(evt);
    }
  };

  componentDidMount() {
    this.props.fetchDepartments();
  }

  get totalAmount() {
    return this.props.productsInCart.reduce((acc, productInCart) => {
      return (acc += productInCart.amount);
    }, 0);
  }

  render() {
    return (
      <header className={classes.Header}>
        <MainHeader
          totalPrice={utils.getTotalPrice(this.props.productsInCart).toFixed(2)}
          totalAmount={this.totalAmount}
        />
        <NavHeader
          departments={this.props.departments}
          isLoadingDepartments={this.props.isLoadingDepartments}
          onClickSearch={this.handleClickSearch}
          onKeyPressEnter={this.handleKeyPressEnter}
        />
      </header>
    );
  }
}

const mapStateToProps = ({ cart, departments }) => {
  return {
    productsInCart: cart.products,
    departments: departments.departments,
    isLoadingDepartments: departments.isLoadingDepartments
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchDepartments: () => dispatch(fetchDepartments())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header));
