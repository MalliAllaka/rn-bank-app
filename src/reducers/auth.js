import { createSlice } from '@reduxjs/toolkit';
import { unionBy as _unionBy } from 'lodash';

const sliceName = 'auth';
export const authState = {
  userToken: '',
  user: {},
  loginDetails: {},
};
const auth = createSlice({
  name: sliceName,
  initialState: authState,
  reducers: {
    setUserToken(state, { payload }) {
      state.userToken = payload;
    },
    setLoginDetails(state, { payload }) {
      state.loginDetails = payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setUserToken, setLoginDetails } = auth.actions;

export default auth.reducer;
