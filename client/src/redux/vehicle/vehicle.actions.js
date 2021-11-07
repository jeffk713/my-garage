import { vehicleActionTypes } from './vehicle.types';

export const addVehicleSuccess = vehicleObj => ({
  type: vehicleActionTypes.ADD_VEHICLE_SUCCESS,
  payload: vehicleObj,
});

export const addVehicleFailure = () => ({
  type: vehicleActionTypes.ADD_VEHICLE_FAILURE,
});
