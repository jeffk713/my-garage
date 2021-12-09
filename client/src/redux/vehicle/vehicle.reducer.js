import { vehicleActionTypes } from './vehicle.types';
import { userActionTypes } from '../user/user.types';

import { getVeihcleArrWithBooleanImageData } from '../../utils/vehicle-utils';

const INITIAL_STATE = {
  vehicles: [],
  isLoading: false,
};

const vehicleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case vehicleActionTypes.GET_USER_VEHICLES_START:
    case vehicleActionTypes.ADD_VEHICLE_START:
    case vehicleActionTypes.UPDATE_VEHICLE_START:
    case vehicleActionTypes.UPLOAD_VEHICLE_IMAGE_START:
    case vehicleActionTypes.DELETE_VEHICLE_START:
    case vehicleActionTypes.ADD_SERVICE_HISTORY_START:
    case vehicleActionTypes.UPDATE_SERVICE_HISTORY_START:
    case vehicleActionTypes.DELETE_SERVICE_HISTORY_START:
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
    case vehicleActionTypes.GET_USER_VEHICLES_FAILURE:
    case vehicleActionTypes.ADD_VEHICLE_SUCCESS:
    case vehicleActionTypes.ADD_VEHICLE_FAILURE:
    case vehicleActionTypes.UPDATE_VEHICLE_SUCCESS:
    case vehicleActionTypes.UPDATE_VEHICLE_FAILURE:
    case vehicleActionTypes.UPLOAD_VEHICLE_IMAGE_SUCCESS:
    case vehicleActionTypes.UPLOAD_VEHICLE_IMAGE_FAILURE:
    case vehicleActionTypes.DELETE_VEHICLE_SUCCESS:
    case vehicleActionTypes.DELETE_VEHICLE_FAILURE:
    case vehicleActionTypes.ADD_SERVICE_HISTORY_SUCCESS:
    case vehicleActionTypes.ADD_SERVICE_HISTORY_FAILURE:
    case vehicleActionTypes.UPDATE_SERVICE_HISTORY_SUCCESS:
    case vehicleActionTypes.UPDATE_SERVICE_HISTORY_FAILURE:
    case vehicleActionTypes.DELETE_SERVICE_HISTORY_SUCCESS:
    case vehicleActionTypes.DELETE_SERVICE_HISTORY_FAILURE:
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
