import React from "react";
import * as classes from "./NavHeader.module.css";
import { NavLink, withRouter } from "react-router-dom";
import * as queryString from "query-string";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

const NavHeader = props => {
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
              const searchParams = queryString.parse(props.location.search);

              return (
                <li key={index}>
                  <NavLink
                    to={{
                      pathname: `/products/department/${
                        department.department_id
                      }`,
                      search: queryString.stringify({
                        page: 1,
                        limit: 5,
                        ...searchParams
                      })
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
            onKeyPress={props.onKeyPressEnter}
          />
          <IconButton
            className={classes.searchButton}
            aria-label="Search"
            onClick={props.onClickSearch}
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
