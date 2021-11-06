import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import vehicleReducer from './vehicle/vehicle.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  vehicle: vehicleReducer,
});

export default rootReducer;
