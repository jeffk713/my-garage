import { userDataActionTypes } from './user-data.types';

export const addVehicle = vehicleObj => ({
  type: userDataActionTypes.ADD_VEHICLE,
  payload: vehicleObj,
});

export const addVehicleHistoy = vehicleHistoryObj => ({
  type: userDataActionTypes.ADD_VEHICLE,
  payload: vehicleHistoryObj,
});
