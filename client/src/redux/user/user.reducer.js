import { userActionTypes } from './user.types';

const INITIAL_STATE = {
  isAuth: false,
  username: null,
  email: null,
  isLoading: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.USER_SIGN_UP_START:
    case userActionTypes.USER_SIGN_IN_START:
    case userActionTypes.USER_SIGN_OUT_START:
      return {
        ...state,
        isLoading: true,
      };
    case userActionTypes.USER_SIGN_UP_SUCCESS:
    case userActionTypes.USER_SIGN_IN_SUCCESS:
      return {
        ...state,
        isAuth: true,
        email: action.payload.email,
        username: action.payload.username,
        isLoading: false,
      };
    case userActionTypes.USER_SIGN_UP_FAILURE:
    case userActionTypes.USER_SIGN_IN_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case userActionTypes.USER_SIGN_OUT_SUCCESS:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};

export default userReducer;
