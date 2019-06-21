import React from "react";
import * as classes from "./NavHeader.module.css";
import { NavLink, withRouter } from "react-router-dom";
import * as queryString from "query-string";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

const NavHeader = props => {
  // function setParams({ query }) {
  //   const searchParams = new URLSearchParams();
  //   searchParams.set("query", query || "");
  //   return searchParams.toString();
  // }

  const handleClickSearch = evt => {
    props.history.push({
      search: `search=${evt.currentTarget.ownerDocument.all.inputSearch.value}`
    });
  };
  return (
    <div className={classes.NavHeader}>
      <div className={classes.Logo}>
        <span>Shopmate</span>
      </div>
      <ul className={classes.MenuCategories}>
        {props.isLoadingDepartments
          ? "Loading Departments"
          : props.departments.map((department, index) => {
              const activeDepartment = () => {
                const searchParams = queryString.parse(props.location.search);
                return (
                  searchParams.department == department.department_id &&
                  "activeDepartment"
                );
              };

              return (
                <li key={index}>
                  <NavLink
                    to={{
                      pathname: "/categories",
                      search: `department=${department.department_id}`
                    }}
                    activeClassName={classes[activeDepartment()]}
                  >
                    {department.name}
                  </NavLink>
                </li>
              );
            })}
      </ul>
      <div className={classes.Search}>
        <Paper className={classes.rootInput}>
          <InputBase
            className={classes.inputSearch}
            placeholder="Search"
            inputProps={{ "aria-label": "Search" }}
            id="inputSearch"
          />
          <IconButton
            className={classes.searchButton}
            aria-label="Search"
            onClick={handleClickSearch}
            id="buttonSearch"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
    </div>
  );
};
export default withRouter(NavHeader);
