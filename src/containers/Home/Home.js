import React, { Component } from 'react';
import MainHeader from "../../components/MainHeader/MainHeader";
import NavHeader from "../../components/NavHeader/NavHeader";
import classes from "./Home.module.css";
import { Route } from 'react-router-dom';
import Categories from "../Categories/Categories";
import Footer from "../../components/Footer/Footer";

class Home extends Component {
    render(){
        return(
            <React.Fragment>
                <header className={classes.Header}>
                    <MainHeader/>
                    <NavHeader/>
                </header>
                <main>
                    <Route path='/'  exact render={()=> <h1>Home page</h1>}/>
                    <Route path='/categories'  component={Categories}/>
                </main>
                <footer>
                    <Footer/>
                </footer>
            </React.Fragment>
        )
    }
}

export default Home