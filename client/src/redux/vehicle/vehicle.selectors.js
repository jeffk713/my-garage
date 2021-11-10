import { createSelector } from 'reselect';

//vehicle state
const selectVehicle = state => state.vehicle;

//vehicles in vehicle state
export const selectVehicles = createSelector(
  [selectVehicle],
  vehicle => vehicle.vehicles
);
