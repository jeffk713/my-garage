import { userActionTypes } from './user.types';

const INITIAL_STATE = {
  username: '',
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case action.type === userActionTypes.USER_SIGN_UP_SUCCESS:
    case action.type === userActionTypes.USER_SIGN_IN_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case action.type === userActionTypes.USER_SIGN_UP_FAILURE:
    case action.type === userActionTypes.USER_SIGN_IN_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default userReducer;
