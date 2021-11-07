import { vehicleActionTypes } from './vehicle.types';

const INITIAL_STATE = {
  123: {
    id: 123,
    nickname: 'car1',
    make: 'Toyota',
    model: 'Corolla',
    year: '1995',
    imageUrl: '',
    history: [
      { job: 'oil change', date: 'Oct 14 2020' },
      { job: 'brake flush', date: 'Apr 14 2020' },
      { job: 'oil change', date: 'Oct 14 2019' },
    ],
  },
  456: {
    id: 456,
    nickname: 'car2',
    make: 'BMW',
    model: '328xi',
    year: '2011',
    imageUrl: '',
    history: [
      { job: 'oil change', date: 'Oct 14 2020' },
      { job: 'oil change', date: 'Apr 14 2020' },
      { job: 'oil change', date: 'Oct 14 2019' },
    ],
  },
};

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
