import { vehicleActionTypes } from './vehicle.types';

const INITIAL_STATE = {};

const vehicleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case vehicleActionTypes.ADD_VEHICLE_SUCCESS:
      return {
        ...state,
        [action.payload._id]: action.payload,
      };
    default:
      return state;
  }
};

export default vehicleReducer;
