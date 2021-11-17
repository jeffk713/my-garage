import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectIsAuth = createSelector([selectUser], user => user.isAuth);

export const selectUserId = createSelector([selectUser], user => user.userId);

export const selectUsername = createSelector(
  [selectUser],
  user => user.username
);

export const selectEmail = createSelector([selectUser], user => user.email);
