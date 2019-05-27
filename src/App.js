import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import './store';
import { getCategories } from './actions/categories';
// import goods from './goods';
import axios from 'axios';
import {Route} from 'react-router-dom';


class App extends Component {

  componentWillMount() {
    const { setGoods } = this.props;
    axios.get('https://backendapi.turing.com/products/').then(({ data }) =>{
      console.log(data)
      setGoods(data.rows)
    });
  }

  render (){
    const { goods } = this.props;
    return(
        <ul>
          {
            !goods
              ? 'Загрузка...'
              : goods.map( (product, index) => (
                <li key={index}>
                  <b>{ product.title }</b> - {product.author}
                </li>
            ))
          }
        </ul>
    )
  }
}

const mapStateToProps = ({ goods }) => ({
  goods: goods.items
});

const mapDispatchToProps = dispatch => ({
  getCategories: category => dispatch(getCategories(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
