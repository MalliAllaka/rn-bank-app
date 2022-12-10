import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { api, setApiHeaders } from './../utils/api';

import * as authSlice from './../reducers/auth';

export const doLogin = createAsyncThunk(
  'auth/login',
  async (userdata, { dispatch, getState }) => {
    try {
      const response = await api({
        method: 'post',
        url: 'authenticate',
        data: userdata,
      });

      const { token } = response.data;
      setApiHeaders(token);

      dispatch(authSlice.setUserToken(token));
      dispatch(authSlice.setLoginDetails(userdata));
    } catch (error) {
      console.log(JSON.stringify(error));
      const errorMessage = _.get(
        error,
        'response.data.message',
        JSON.stringify(error)
      );
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
