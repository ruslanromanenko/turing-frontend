import React from "react";
import classes from "./NavHeader.module.css";

const NavHeader = ({ departments, isLoadingDepartments }) => {
  return (
    <div className={classes.NavHeader}>
      <div className={classes.Logo} />
      <ul className={classes.MenuCategories}>
        {isLoadingDepartments
          ? "Loading Departments"
          : departments.map((department, index) => {
              return <li key={index}>{department.name}</li>;
            })}
      </ul>
      <div className={classes.Search}>Search</div>
    </div>
  );
};
export default NavHeader;
