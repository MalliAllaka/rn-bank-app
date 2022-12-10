import { createSelector } from 'reselect';

export const auth = (state) => state.auth;

export const getLoginDetails = createSelector(auth, (authData) => {
  return authData?.loginDetails || {};
});

export const getToken = createSelector(auth, (authData) => {
  return authData?.userToken || '';
});

export const getUser = createSelector(auth, (authData) => {
  return authData?.user || {};
});
