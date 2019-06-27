import React from "react";
import classes from "./Filters.module.css";
import { fetchCategories, fetchCategoriesByDepartment } from "../../actions";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import * as queryString from "query-string";

class Filters extends React.Component {
  componentDidMount() {
    // TODO do we need that fetch here?
    this.props.fetchCategories();
  }

  componentWillUpdate(nextProps, nextState) {
    // TODO do we need that fetch here?
    const searchParams = queryString.parse(nextProps.location.search);
    if (nextProps.location.search !== this.props.location.search) {
      if (searchParams.department) {
        this.props.fetchCategoriesByDepartment(searchParams.department);
      }
    }
  }
  render() {
    return (
      <aside className={classes.Filters}>
        <h1>Categories</h1>
        <ul>
          {this.props.isLoadingCategories
            ? "Loading Categories"
            : this.props.categories.map((category, index) => {
                const activeCategory = () => {
                  const searchParams = queryString.parse(
                    this.props.location.search
                  );
                  return (
                    searchParams.category == category.category_id &&
                    "activeCategory"
                  );
                };
                return (
                  <li key={index} id={category.category_id}>
                    <NavLink
                      to={{
                        pathname: `/products`,
                        search: `category=${category.category_id}`
                      }}
                      activeClassName={classes[activeCategory()]}
                    >
                      {category.name}
                    </NavLink>
                  </li>
                );
              })}
        </ul>
      </aside>
    );
  }
}

const mapStateToProps = ({ categories }) => {
  return {
    categories: categories.categories,
    isLoadingCategories: categories.isLoadingCategories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    fetchCategoriesByDepartment: departmentId =>
      dispatch(fetchCategoriesByDepartment(departmentId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Filters));
