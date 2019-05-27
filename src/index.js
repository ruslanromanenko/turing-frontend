import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './containers/Home/Home';
import { Provider } from 'react-redux';
import createStore from './store';
import {BrowserRouter} from "react-router-dom";

const store = createStore();
const aplication = (
    <BrowserRouter>
        <Provider store={store}>
            <Home />
        </Provider>
    </BrowserRouter>
)

// setTimeout(function () {
//     store.dispatch({
//         type: 'SET_GOODS',
//         payload: [
//             {
//                 id: 0,
//                 title: 'Change Books'
//             }
//         ]
//
//     })
// }, 1000);

ReactDOM.render(
    aplication
    , document.getElementById('root')
);