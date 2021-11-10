import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import vehicleReducer from './vehicle/vehicle.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'vehicle'],
};

const rootReducer = combineReducers({
  user: userReducer,
  vehicle: vehicleReducer,
});

export default persistReducer(persistConfig, rootReducer);
