import axios from 'axios';

import {
  getUserVehiclesStart,
  getUserVehiclesSuccess,
  getUserVehiclesFailure,
  addVehicleStart,
  addVehicleSuccess,
  addVehicleFailure,
  uploadVehicleImageStart,
  uploadVehicleImageSuccess,
  uploadVehicleImageFailure,
  updateVehicleStart,
  updateVehicleSuccess,
  updateVehicleFailure,
  deleteVehicleStart,
  deleteVehicleSuccess,
  deleteVehicleFailure,
  addServiceHistoryStart,
  addServiceHistorySuccess,
  addServiceHistoryFailure,
  updateServiceHistoryStart,
  updateServiceHistorySuccess,
  updateServiceHistoryFailure,
  deleteServiceHistoryStart,
  deleteServiceHistorySuccess,
  deleteServiceHistoryFailure,
} from './vehicle.actions';
import { triggerErrorBanner } from '../error/error.actions';

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

const conditionalImageUploadAndGetUserVehicles =
  dispatch => async (vehicleObj, imageFile) => {
    if (imageFile) {
      await dispatch(
        uploadVehicleImage(imageFile, `/api/vehicle/${vehicleObj._id}`)
      );
    }

    dispatch(getUserVehiclesStartAsync(vehicleObj.user));
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

      conditionalImageUploadAndGetUserVehicles(dispatch)(vehicleObj, imageFile);
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
      const vehicleObj = await axios
        .put(`/api/vehicle/${vehicleId}`, body, config)
        .then(res => res.data);

      dispatch(updateVehicleSuccess());

      conditionalImageUploadAndGetUserVehicles(dispatch)(vehicleObj, imageFile);
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
