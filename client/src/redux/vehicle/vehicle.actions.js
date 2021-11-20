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

export const addVehicleSuccess = () => ({
  type: vehicleActionTypes.ADD_VEHICLE_SUCCESS,
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

export const updateVehicleStart = () => ({
  type: vehicleActionTypes.UPDATE_VEHICLE_START,
});

export const updateVehicleSuccess = () => ({
  type: vehicleActionTypes.UPDATE_VEHICLE_SUCCESS,
});

export const updateVehicleFailure = () => ({
  type: vehicleActionTypes.UPDATE_VEHICLE_FAILURE,
});

export const deleteVehicleStart = () => ({
  type: vehicleActionTypes.DELETE_VEHICLE_START,
});

export const deleteVehicleSuccess = () => ({
  type: vehicleActionTypes.DELETE_VEHICLE_SUCCESS,
});

export const deleteVehicleFailure = () => ({
  type: vehicleActionTypes.DELETE_VEHICLE_FAILURE,
});

export const addServiceHistoryStart = () => ({
  type: vehicleActionTypes.ADD_SERVICE_HISTORY_START,
});

export const addServiceHistorySuccess = () => ({
  type: vehicleActionTypes.ADD_SERVICE_HISTORY_SUCCESS,
});

export const addServiceHistoryFailure = () => ({
  type: vehicleActionTypes.ADD_SERVICE_HISTORY_FAILURE,
});

export const updateServiceHistoryStart = () => ({
  type: vehicleActionTypes.UPDATE_SERVICE_HISTORY_START,
});

export const updateServiceHistorySuccess = () => ({
  type: vehicleActionTypes.UPDATE_SERVICE_HISTORY_SUCCESS,
});

export const updateServiceHistoryFailure = () => ({
  type: vehicleActionTypes.UPDATE_SERVICE_HISTORY_FAILURE,
});

export const deleteServiceHistoryStart = () => ({
  type: vehicleActionTypes.DELETE_SERVICE_HISTORY_START,
});

export const deleteServiceHistorySuccess = () => ({
  type: vehicleActionTypes.DELETE_SERVICE_HISTORY_SUCCESS,
});

export const deleteServiceHistoryFailure = () => ({
  type: vehicleActionTypes.DELETE_SERVICE_HISTORY_FAILURE,
});

//========================= vehicle =================================//

export const getUserVehiclesStartAsync = userId => async dispatch => {
  dispatch(getUserVehiclesStart());
  try {
    const res = await axios.get(`/api/vehicle/user-vehicles/${userId}`);
    const vehicles = res.data;
    dispatch(getUserVehiclesSuccess(vehicles));
    return vehicles;
  } catch (err) {
    console.error('ERROR UPON VEHICLE LOADING:', err.message);
    dispatch(getUserVehiclesFailure());
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
  } catch (err) {
    console.error('ERROR UPON VEHICLE REGISTRATION:', err.message);
    dispatch(uploadVehicleImageFailure());
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
      await axios
        .post('/api/vehicle/register', body, config)
        .then(res => res.data);

      dispatch(addVehicleSuccess());
    } catch (err) {
      console.error('ERROR UPON VEHICLE REGISTRATION:', err.message);
      dispatch(addVehicleFailure());
    }
  };

export const updateVehicleStartAsync =
  ({ nickname, make, model, year, vehicleId }) =>
  async dispatch => {
    dispatch(updateVehicleStart());

    const updatedVehicle = { nickname, make, model, year };
    const body = JSON.stringify(updatedVehicle);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const vehicleObj = await axios
        .put(`/api/vehicle/${vehicleId}`, body, config)
        .then(res => res.data);

      dispatch(updateVehicleSuccess(vehicleObj));
      return vehicleObj;
    } catch (err) {
      console.error('ERROR UPON VEHICLE UPDATE:', err.message);
      dispatch(updateVehicleFailure());
    }
  };

export const delectVehicleStartAsync = vehicleId => async dispatch => {
  dispatch(deleteVehicleStart());
  const body = JSON.stringify({ vehicleId });
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    await axios
      .delete(`/api/vehicle/${vehicleId}`, body, config)
      .then(res => res.data);
    dispatch(deleteVehicleSuccess());
  } catch (err) {
    console.error('ERROR UPON VEHICLE DELETE:', err.message);
    dispatch(deleteVehicleFailure());
  }
};

//========================= service history =================================//

export const addServiceHistoryStartAsync =
  ({ requestURL, serviceName, mileage, date, note }) =>
  async dispatch => {
    dispatch(addServiceHistoryStart());
    const serviceHistory = { serviceName, mileage, date, note };
    const body = JSON.stringify(serviceHistory);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      await axios.put(requestURL, body, config);
      dispatch(addServiceHistorySuccess());
    } catch (err) {
      console.error('ERROR UPON SERVICE HISTORY UPDATE:', err.message);
      dispatch(addServiceHistoryFailure());
    }
  };

export const updateServiceHistoryStartAsync =
  ({ requestURL, serviceName, mileage, date, note }) =>
  async dispatch => {
    dispatch(updateServiceHistoryStart());
    const updatedServiceHistory = { serviceName, mileage, date, note };
    const body = JSON.stringify(updatedServiceHistory);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      await axios.put(requestURL, body, config);
      dispatch(updateServiceHistorySuccess());
    } catch (err) {
      console.error('ERROR UPON SERVICE HISTORY UPDATE:', err.message);
      dispatch(updateServiceHistoryFailure());
    }
  };

export const deleteServiceHistoryStartAsync = requestURL => async dispatch => {
  dispatch(deleteServiceHistoryStart());
  try {
    console.log(requestURL);
    await axios.delete(requestURL);
    dispatch(deleteServiceHistorySuccess());
  } catch (err) {
    console.error('ERROR UPON SERVICE HISTORY UPDATE:', err.message);
    dispatch(deleteServiceHistoryFailure());
  }
};
