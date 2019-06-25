import React from "react";
import classes from "./Header.module.css";
import { connect } from "react-redux";
import MainHeader from "../../components/MainHeader/MainHeader";
import NavHeader from "../../components/NavHeader/NavHeader";
import constants from "../../constants";
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

  getTotalAmount = products => {
    return products.reduce((acc, productInCart) => {
      return (acc += productInCart.amount);
    }, 0);
  };

  render() {
    return (
      <header className={classes.Header}>
        <MainHeader
          totalPrice={constants.getTotalPrice(this.props.cart).toFixed(2)}
          totalAmount={this.getTotalAmount(this.props.cart)}
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
    cart,
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
