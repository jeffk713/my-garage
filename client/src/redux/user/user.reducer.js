import { userActionTypes } from './user.types';

const INITIAL_STATE = {
  isAuth: false,
  username: '',
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.USER_SIGN_UP_SUCCESS:
    case userActionTypes.USER_SIGN_IN_SUCCESS:
      return {
        ...state,
        isAuth: true,
        email: action.payload.email,
        username: action.payload.username,
      };
    default:
      return state;
  }
};

export default userReducer;
