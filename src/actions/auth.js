import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { api, setApiHeaders, setBaseUrl } from "./../utils/api";

import * as authSlice from "./../reducers/auth";
import { getCommonData } from "../selector/common";

export const doLogin = createAsyncThunk(
  "auth/login",
  async (userdata, { dispatch, getState }) => {
    try {
      console.log(userdata);
      const state = getState();
      const common = getCommonData(state);
      const { baseUrl } = common;
      setBaseUrl(baseUrl);

      const response = await api({
        method: "post",
        url: "authenticate",
        data: userdata,
      });

      const { token } = response.data;
      setApiHeaders(token);

      const userResponse = await api({
        method: "get",
        url: `user/findByUsername?username=${userdata.username}`,
      });

      dispatch(authSlice.setUserToken(token));
      dispatch(authSlice.setLoginDetails(userdata));
      dispatch(authSlice.setUser(userResponse.data));
    } catch (error) {
      console.log(error);
      const errorMessage = _.get(
        error,
        "response.data.message",
        JSON.stringify(error)
      );
      dispatch(authSlice.setUserToken(""));
      dispatch(authSlice.setLoginDetails(""));
      return false;
    }
    return true;
  }
);

// export const verifyLogin = createAsyncThunk(
//   'auth/verifyLogin',
//   async (loginDetails, { dispatch, getState }) => {
//     try {
//       const response = await api({
//         method: 'post',
//         url: 'auth/login',
//         data: { ...loginDetails },
//       });

//       const { token } = response.data;
//       setApiHeaders(token);

//       dispatch(authSlice.setUserToken(token));
//       console.log('after verifyLogin slice');
//     } catch (error) {
//       console.log(error);
//       dispatch(authSlice.setUserToken(''));
//       return false;
//     }
//     return true;
//   }
// );
