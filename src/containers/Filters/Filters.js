import React from "react";
import classes from "./Filters.module.css";
import { fetchCategories, fetchProductsByCategory } from "../../actions";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

class Filters extends React.Component {
  componentDidMount() {
    this.props.fetchCategories();
  }
  handleClickCategory = evt => {
    this.props.fetchProductsByCategory(evt.currentTarget.id);
  };

  render() {
    return (
      <aside className={classes.Filters}>
        <h1>Categories</h1>
        <ul>
          {this.props.isLoadingCategories
            ? "Loading Categories"
            : this.props.categories.map((category, index) => {
                return (
                  <li
                    key={index}
                    id={category.category_id}
                    onClick={this.handleClickCategory}
                  >
                    <NavLink
                      to={`/categories/${category.name}`}
                      activeStyle={{
                        color: "#f62f5e",
                        borderBottom: "2px solid #f62f5e"
                      }}
                      exact
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
    fetchProductsByCategory: categoryId =>
      dispatch(fetchProductsByCategory(categoryId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filters);
