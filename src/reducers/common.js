import { createSlice } from "@reduxjs/toolkit";
import { unionBy as _unionBy } from "lodash";
import { apiBaseUrl } from "../utils/api";

const sliceName = "common";
export const commonState = {
  baseUrl: apiBaseUrl,
};
const common = createSlice({
  name: sliceName,
  initialState: commonState,
  reducers: {
    updateBaseUrl(state, { payload }) {
      state.baseUrl = payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { updateBaseUrl } = common.actions;

export default common.reducer;
