import { userActionTypes, userDataActionTypes } from './user-data.types';

const INITIAL_USER_DATA = {
  username: 'Jeffoo',
  vehicles: {
    123: {
      id: 123,
      nickname: 'car1',
      make: 'Toyota',
      model: 'Corolla',
      year: '1995',
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
      history: [
        { job: 'oil change', date: 'Oct 14 2020' },
        { job: 'oil change', date: 'Apr 14 2020' },
        { job: 'oil change', date: 'Oct 14 2019' },
      ],
    },
  },
};

const userDataReducer = (state = INITIAL_USER_DATA, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default userDataReducer;
