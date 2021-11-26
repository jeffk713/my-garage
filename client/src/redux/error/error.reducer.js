import { errorActionTypes } from './error.types';

const INITIAL_STATE = {
  errorMessage: null,
};

const errorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case errorActionTypes.ERROR_PRESENT:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case errorActionTypes.ERROR_NOT_PRESENT:
      return {
        ...state,
        errorMessage: null,
      };
    default:
      return state;
  }
};

export default errorReducer;
