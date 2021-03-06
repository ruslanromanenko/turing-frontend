import {
  CATEGORIES_FETCHED,
  CATEGORIES_LOADING,
  FETCH_CATEGORIES_BY_DEPARTMENT
} from "../actions/types";

const initialState = {
  isLoadingCategories: false,
  categories: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CATEGORIES_LOADING:
      return {
        ...state,
        isLoadingCategories: action.payload
      };
    case CATEGORIES_FETCHED:
      return {
        ...state,
        categories: action.payload,
        isLoadingCategories: false
      };
    case FETCH_CATEGORIES_BY_DEPARTMENT:
      return {
        ...state,
        categories: action.payload,
        isLoadingCategories: false
      };
    default:
      return state;
  }
};
