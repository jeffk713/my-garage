import axios from 'axios';

import { vehicleActionTypes } from './vehicle.types';

export const getUserVehiclesStart = () => ({
  type: vehicleActionTypes.GET_USER_VEHICLES_START,
});

export const getUserVehiclesSuccess = vehicles => ({
  type: vehicleActionTypes.GET_USER_VEHICLES_SUCCESS,
  payload: vehicles,
});

export const getUserVehiclesFailure = () => ({
  type: vehicleActionTypes.GET_USER_VEHICLES_FAILURE,
});

export const addVehicleStart = () => ({
  type: vehicleActionTypes.ADD_VEHICLE_START,
});

export const addVehicleSuccess = vehicleObj => ({
  type: vehicleActionTypes.ADD_VEHICLE_SUCCESS,
  payload: vehicleObj,
});

export const addVehicleFailure = () => ({
  type: vehicleActionTypes.ADD_VEHICLE_FAILURE,
});

export const uploadVehicleImageStart = () => ({
  type: vehicleActionTypes.UPLOAD_VEHICLE_IMAGE_START,
});

export const uploadVehicleImageSuccess = () => ({
  type: vehicleActionTypes.UPLOAD_VEHICLE_IMAGE_SUCCESS,
});

export const uploadVehicleImageFailure = () => ({
  type: vehicleActionTypes.UPLOAD_VEHICLE_IMAGE_FAILURE,
});

export const getUserVehiclesStartAsync = userId => async dispatch => {
  dispatch(getUserVehiclesStart());
  try {
    const vehicles = await axios.get(`/api/vehicle/user-vehicles/${userId}`);
    console.log(vehicles);
    dispatch(getUserVehiclesSuccess());
  } catch (err) {
    console.error('ERROR UPON VEHICLE REGISTRATION:', err.message);
    dispatch(getUserVehiclesFailure());
    return false;
  }
};

export const uploadVehicleImage = (imgFile, requestURL) => async dispatch => {
  dispatch(uploadVehicleImageStart());

  const formData = new FormData();
  formData.append('vehicleImage', imgFile, imgFile.name);

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  try {
    await axios.post(requestURL, formData, config);
    dispatch(uploadVehicleImageSuccess());
    return true;
  } catch (err) {
    console.error('ERROR UPON VEHICLE REGISTRATION:', err.message);
    dispatch(uploadVehicleImageFailure());
    return false;
  }
};

export const addVehicleStartAsync =
  ({ nickname, make, model, year }) =>
  async dispatch => {
    dispatch(addVehicleStart());

    const newVehicle = { nickname, make, model, year };
    const body = JSON.stringify(newVehicle);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const vehicleObj = await axios
        .post('/api/vehicle/register', body, config)
        .then(res => res.data);

      dispatch(addVehicleSuccess(vehicleObj));
      return vehicleObj;
    } catch (err) {
      console.error('ERROR UPON VEHICLE REGISTRATION:', err.message);
      dispatch(addVehicleFailure());
      return false;
    }
  };
