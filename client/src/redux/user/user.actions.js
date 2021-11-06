import { userActionTypes } from './user.types';

export const userSignUpSuccess = userObj => ({
  type: userActionTypes.USER_SIGN_UP_SUCCESS,
  payload: userObj,
});

export const userSignUpFailure = () => ({
  type: userActionTypes.USER_SIGN_UP_FAILURE,
});

// export const userSignInSuccess = userObj => ({
//   type: userActionTypes.USER_SIGN_IN_SUCCESS,
//   payload: userObj,
// });

// export const userSignInFailure = () => ({
//   type: userActionTypes.USER_SIGN_IN_SUCCESS,
// });
