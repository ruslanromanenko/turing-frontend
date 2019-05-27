import React from 'react';
import classes from './MainHeader.module.css';
import { NavLink } from 'react-router-dom';

const MainHeader = props => {
    return (
        <div className={classes.MainHeader }>
            <span>Hi! Sign in or Register</span>
            <nav className={classes.MainMenu}>
                <ul>
                    <li><NavLink to="/" exact>Home</NavLink></li>
                    <li><NavLink to="/categories" exact>Categories</NavLink></li>
                </ul>
            </nav>
            <span className={classes.Currency}>
                GBP
            </span>
            <div className={classes.Cart}>
                <span>Your bag: 3.99</span>
            </div>
        </div>
    )};
export default MainHeader