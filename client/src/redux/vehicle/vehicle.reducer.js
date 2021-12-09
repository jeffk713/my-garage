import { vehicleActionTypes } from './vehicle.types';
import { userActionTypes } from '../user/user.types';

import { getVeihcleArrWithBooleanImageData } from '../../utils/vehicle-utils';

const INITIAL_STATE = {
  vehicles: [],
  isLoading: false,
};

const vehicleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case vehicleActionTypes.ADD_VEHICLE_START:
    case vehicleActionTypes.GET_USER_VEHICLES_START:
    case vehicleActionTypes.UPLOAD_VEHICLE_IMAGE_START:
      return {
        ...state,
        isLoading: true,
      };
    case vehicleActionTypes.GET_USER_VEHICLES_SUCCESS:
      return {
        ...state,
        vehicles: getVeihcleArrWithBooleanImageData(action.payload),
        isLoading: false,
      };
    case vehicleActionTypes.ADD_VEHICLE_SUCCESS:
    case vehicleActionTypes.ADD_VEHICLE_FAILURE:
    case vehicleActionTypes.UPLOAD_VEHICLE_IMAGE_SUCCESS:
    case vehicleActionTypes.UPLOAD_VEHICLE_IMAGE_FAILURE:
    case vehicleActionTypes.GET_USER_VEHICLES_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case userActionTypes.USER_SIGN_OUT_SUCCESS:
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};

export default vehicleReducer;
