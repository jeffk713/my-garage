import { errorActionTypes } from './error.types';

export const errorPresent = errorMessage => ({
  type: errorActionTypes.ERROR_PRESENT,
  payload: errorMessage,
});

export const errorNotPresent = () => ({
  type: errorActionTypes.ERROR_NOT_PRESENT,
});

export const triggerErrorBanner = errorMessage => dispatch => {
  dispatch(errorPresent(errorMessage));

  setTimeout(() => {
    dispatch(errorNotPresent());
  }, 3500);
};
