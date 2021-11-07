import { userActionTypes } from './user.types';

const INITIAL_STATE = {
  isSignIn: false,
  username: '',
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case action.type === userActionTypes.USER_SIGN_UP_SUCCESS:
    case action.type === userActionTypes.USER_SIGN_IN_SUCCESS:
      return {
        ...state,
        isSignIn: true,
        ...action.payload,
      };
    case action.type === userActionTypes.USER_SIGN_UP_FAILURE:
    case action.type === userActionTypes.USER_SIGN_IN_FAILURE:
      return {
        ...state,
        isSignIn: false,
      };
    default:
      return state;
  }
};

export default userReducer;
