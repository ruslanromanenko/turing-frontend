import { DEPARTMENTS_FETCHED, DEPARTMENTS_LOADING } from "../actions/types";

const initialState = {
  isLoadingDepartments: false,
  departments: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DEPARTMENTS_LOADING:
      return {
        ...state,
        isLoadingDepartments: action.payload
      };
    case DEPARTMENTS_FETCHED:
      return {
        ...state,
        departments: action.payload,
        isLoadingDepartments: false
      };
    default:
      return state;
  }
};
