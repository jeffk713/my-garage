import { vehicleActionTypes } from './vehicle.types';

const INITIAL_STATE = {
  vehicles: {},
};

const vehicleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case vehicleActionTypes.ADD_VEHICLE_SUCCESS:
      return {
        ...state,
        vehicles: { ...state.vehicles, [action.payload._id]: action.payload },
      };
    default:
      return state;
  }
};

export default vehicleReducer;
