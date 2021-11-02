import { combineReducers } from 'redux';

import userDataReducer from './user-data/user-data.reducer';

const rootReducer = combineReducers({
  userData: userDataReducer,
});

export default rootReducer;
