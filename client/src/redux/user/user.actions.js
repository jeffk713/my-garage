import { userActionTypes } from './user.types';

export const userSignUpStart = () => ({
  type: userActionTypes.USER_SIGN_UP_START,
});

export const userSignUpSuccess = userObj => ({
  type: userActionTypes.USER_SIGN_UP_SUCCESS,
  payload: userObj,
});

export const userSignUpFailure = () => ({
  type: userActionTypes.USER_SIGN_UP_FAILURE,
});

export const userSignInStart = () => ({
  type: userActionTypes.USER_SIGN_IN_START,
});

export const userSignInSuccess = userObj => ({
  type: userActionTypes.USER_SIGN_IN_SUCCESS,
  payload: userObj,
});

export const userSignInFailure = () => ({
  type: userActionTypes.USER_SIGN_IN_FAILURE,
});

export const userSignOutStart = () => ({
  type: userActionTypes.USER_SIGN_OUT_START,
});

export const userSignOutSuccess = () => ({
  type: userActionTypes.USER_SIGN_OUT_SUCCESS,
});

export const userSignOutFailure = () => ({
  type: userActionTypes.USER_SIGN_OUT_FAILURE,
});
