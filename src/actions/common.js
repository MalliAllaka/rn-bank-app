import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { api, setApiHeaders } from './../utils/api';

import * as commonSlice from './../reducers/auth';

export const registration = createAsyncThunk(
  'common/registration',
  async (userdata, { dispatch, getState }) => {
    try {
      var data = {
        newPassword: userdata.password,
        customer: {
          accountType: {
            id: userdata.accountType,
          },
          customerDetails: {
            firstName: userdata.firstName,
            lastName: userdata.lastName,
            age: userdata.age,
            address: userdata.address,
            country: userdata.country,
            email: userdata.email,
            phoneNo: userdata.phoneNo,
          },
        },
      };
      const response = await api({
        method: 'post',
        url: 'user/create',
        data: data,
      });
      return { status: true, data: response.data };
    } catch (error) {
      console.log(error);
      const errorMessage = _.get(
        error,
        'response.data.message',
        JSON.stringify(error)
      );
    }
    return { status: false, data: null };
  }
);

export const getCustomers = createAsyncThunk(
  'common/getCustomers',
  async (data, { dispatch, getState }) => {
    try {
      const response = await api({
        method: 'get',
        url: `customer/findAll?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`,
        data: data,
      });
      return { status: true, data: response.data };
    } catch (error) {
      console.log(error);
      const errorMessage = _.get(
        error,
        'response.data.message',
        JSON.stringify(error)
      );
    }
    return { status: false, data: null };
  }
);

export const getSearchCustomers = createAsyncThunk(
  'common/searchCustomers',
  async (data, { dispatch, getState }) => {
    try {
      const response = await api({
        method: 'get',
        url: `customer/searchCustomers?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}&searchText=${data.searchText}`,
      });
      return { status: true, data: response.data };
    } catch (error) {
      console.log(error);
      const errorMessage = _.get(
        error,
        'response.data.message',
        JSON.stringify(error)
      );
    }
    return { status: false, data: null };
  }
);

export const withdrawAmount = createAsyncThunk(
  'common/withdrawAmount',
  async (data, { dispatch, getState }) => {
    try {
      const response = await api({
        method: 'post',
        url: `transactions/withdrawAmount`,
        data: data,
      });
      console.log(response.data);

      return { status: true, data: response.data.transactions };
    } catch (error) {
      console.log(error);
      const errorMessage = _.get(error, 'response.data');
      return { status: false, message: errorMessage.errorMessage };
    }
  }
);

export const depositeAmount = createAsyncThunk(
  'common/depositeAmount',
  async (data, { dispatch, getState }) => {
    try {
      const response = await api({
        method: 'post',
        url: `transactions/depositeAmount`,
        data: data,
      });
      console.log(response.data);

      return { status: true, data: response.data.transactions };
    } catch (error) {
      console.log(error);
      const errorMessage = _.get(error, 'response.data');
      return { status: false, message: errorMessage.errorMessage };
    }
  }
);

export const getTransactions = createAsyncThunk(
  'common/getTransactions',
  async (data, { dispatch, getState }) => {
    try {
      const response = await api({
        method: 'get',
        url: `transactions/findbyCustomerId?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}&customerId=${data.customerId}`,
      });
      return { status: true, data: response.data };
    } catch (error) {
      console.log(error);
      const errorMessage = _.get(
        error,
        'response.data.message',
        JSON.stringify(error)
      );
    }
    return { status: false, data: null };
  }
);

export const getCustomer = createAsyncThunk(
  'common/getCustomer',
  async (data, { dispatch, getState }) => {
    try {
      const response = await api({
        method: 'get',
        url: `customer/searchCustomer?id=${data.customerId}`,
      });
      return { status: true, data: response.data };
    } catch (error) {
      console.log(error);
      const errorMessage = _.get(
        error,
        'response.data.message',
        JSON.stringify(error)
      );
    }
    return { status: false, data: null };
  }
);
