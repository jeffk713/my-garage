import { vehicleActionTypes } from './vehicle.types';

export const addVehicle = vehicleObj => ({
  type: vehicleActionTypes.ADD_VEHICLE,
  payload: vehicleObj,
});