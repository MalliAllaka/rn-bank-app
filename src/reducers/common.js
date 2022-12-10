import { createSlice } from '@reduxjs/toolkit';
import { unionBy as _unionBy } from 'lodash';

const sliceName = 'common';
export const commonState = {};
const common = createSlice({
  name: sliceName,
  initialState: commonState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = common.actions;

export default common.reducer;
