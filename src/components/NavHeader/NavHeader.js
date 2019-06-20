import React from "react";
import classes from "./NavHeader.module.css";
import { NavLink, withRouter } from "react-router-dom";
import * as queryString from "query-string";

const NavHeader = props => {
  return (
    <div className={classes.NavHeader}>
      <div className={classes.Logo} />
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
              console.log(props);

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
      <div className={classes.Search}>Search</div>
    </div>
  );
};
export default withRouter(NavHeader);
