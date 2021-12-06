import axios from 'axios';

import { vehicleActionTypes } from './vehicle.types';
import { triggerErrorBanner } from '../error/error.actions';

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
  } catch (err) {
    dispatch(triggerErrorBanner(err.response.data.errorMessage));
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
    dispatch(triggerErrorBanner(err.response.data.errorMessage));
    dispatch(uploadVehicleImageFailure());
  }
};

export const addVehicleStartAsync =
  ({ nickname, make, model, year, imageFile }) =>
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
      // add vehicle
      const vehicleObj = await axios
        .post('/api/vehicle/register', body, config)
        .then(res => res.data);

      dispatch(addVehicleSuccess());

      // add image file if present
      if (imageFile) {
        dispatch(
          uploadVehicleImage(imageFile, `/api/vehicle/${vehicleObj._id}`)
        );
      }
    } catch (err) {
      dispatch(triggerErrorBanner(err.response.data.errorMessage));
      dispatch(addVehicleFailure());
    }
  };

export const updateVehicleStartAsync =
  ({ nickname, make, model, year, imageFile, vehicleId }) =>
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
      // update vehicle
      await axios
        .put(`/api/vehicle/${vehicleId}`, body, config)
        .then(res => res.data);

      dispatch(updateVehicleSuccess());

      // add image file if present
      if (imageFile) {
        dispatch(uploadVehicleImage(imageFile, `/api/vehicle/${vehicleId}`));
      }
    } catch (err) {
      // dispatch(triggerErrorBanner(err.response.data.errorMessage));
      console.log(err);
      dispatch(updateVehicleFailure());
    }
  };

export const delectVehicleStartAsync =
  (vehicleId, userId) => async dispatch => {
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
      dispatch(getUserVehiclesStartAsync(userId));
    } catch (err) {
      dispatch(triggerErrorBanner(err.response.data.errorMessage));
      dispatch(deleteVehicleFailure());
    }
  };

//========================= service history =================================//

export const addServiceHistoryStartAsync =
  ({ requestURL, serviceName, mileage, date, note, userId }) =>
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
      dispatch(getUserVehiclesStartAsync(userId));
    } catch (err) {
      dispatch(triggerErrorBanner(err.response.data.errorMessage));
      dispatch(addServiceHistoryFailure());
    }
  };

export const updateServiceHistoryStartAsync =
  ({ requestURL, serviceName, mileage, date, note, userId }) =>
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
      dispatch(getUserVehiclesStartAsync(userId));
    } catch (err) {
      dispatch(triggerErrorBanner(err.response.data.errorMessage));
      dispatch(updateServiceHistoryFailure());
    }
  };

export const deleteServiceHistoryStartAsync =
  (requestURL, userId) => async dispatch => {
    dispatch(deleteServiceHistoryStart());
    try {
      await axios.delete(requestURL);
      dispatch(deleteServiceHistorySuccess());
      dispatch(getUserVehiclesStartAsync(userId));
    } catch (err) {
      dispatch(triggerErrorBanner(err.response.data.errorMessage));
      dispatch(deleteServiceHistoryFailure());
    }
  };
