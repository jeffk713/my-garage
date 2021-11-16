import axios from 'axios';

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

export const userSignInStartAsync = (email, password) => async dispatch => {
  dispatch(userSignInStart());
  const userCredentials = {
    email,
    password,
  };
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify(userCredentials);
  try {
    const userObj = await axios
      .post('/api/user/sign-in', body, config)
      .then(res => res.data);

    dispatch(userSignInSuccess(userObj));
    return true;
  } catch (err) {
    console.error('ERROR UPON SIGN-IN:', err.message);
    dispatch(userSignInFailure());
    return false;
  }
};

export const userSignUpStartAsync =
  (username, email, password) => async dispatch => {
    dispatch(userSignUpStart());
    const newUser = {
      username,
      email,
      password,
    };
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify(newUser);
    try {
      const userObj = await axios
        .post('/api/user/sign-up', body, config)
        .then(res => res.data);

      dispatch(userSignUpSuccess(userObj));
      return true;
    } catch (err) {
      console.error('ERROR UPON SIGN-IN:', err.message);
      dispatch(userSignUpFailure());
      return false;
    }
  };

export const userSignOutStartAsync = () => async dispatch => {
  dispatch(userSignOutStart());
  try {
    await axios.get('/api/user/sign-out');
    dispatch(userSignOutSuccess());
    return true;
  } catch (err) {
    console.error('ERROR UPON SIGN OUT:', err.message);
    dispatch(userSignOutFailure());
    return false;
  }
};
