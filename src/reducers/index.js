import { combineReducers } from "redux";
import goods from './goods';
import categories from './categories';

export default combineReducers({
        goods,
        categories
    });