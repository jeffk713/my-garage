import axios from 'axios';

import {
  userSignUpStart,
  userSignUpSuccess,
  userSignUpFailure,
  userSignInStart,
  userSignInSuccess,
  userSignInFailure,
  userSignOutStart,
  userSignOutSuccess,
  userSignOutFailure,
} from './user.actions';
import { getUserVehiclesStartAsync } from '../vehicle/vehicle.thunk-actions';
import { triggerErrorBanner } from '../error/error.actions';

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
    dispatch(getUserVehiclesStartAsync(userObj.userId));
  } catch (err) {
    dispatch(triggerErrorBanner(err.response.data.errorMessage));
    dispatch(userSignInFailure());
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
    } catch (err) {
      dispatch(triggerErrorBanner(err.response.data.errorMessage));
      dispatch(userSignUpFailure());
    }
  };

export const userSignOutStartAsync = () => async dispatch => {
  dispatch(userSignOutStart());
  try {
    await axios.get('/api/user/sign-out');
    dispatch(userSignOutSuccess());
  } catch (err) {
    dispatch(triggerErrorBanner(err.response.data.errorMessage));
    dispatch(userSignOutFailure());
  }
};
