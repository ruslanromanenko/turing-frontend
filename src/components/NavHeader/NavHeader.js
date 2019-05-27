import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './NavHeader.module.css';



class NavHeader extends Component {
    render() {
        return (
            <div className={classes.NavHeader}>
                <div className={classes.Logo}>
                </div>
                <ul className={classes.MenuCategories}>
                    <li><a href="#">Women</a></li>
                    <li><a href="#">Men</a></li>
                    <li><a href="#">Kids</a></li>
                    <li><a href="#">Shoes</a></li>
                    <li><a href="#">Brands</a></li>
                </ul>
                <div className={classes.Search}>Search</div>
                <div className={classes.Cart}>Basket</div>
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    categories: state.categories
});

// const mapDispatchToProps = dispatch => ({
//     setGoods: goods => dispatch(setGoods(goods))
// });
export default connect(mapStateToProps)(NavHeader);