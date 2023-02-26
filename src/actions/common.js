import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { api, setApiHeaders } from "./../utils/api";

import * as commonSlice from "./../reducers/auth";

import * as authSlice from "./../reducers/auth";

export const registration = createAsyncThunk(
  "common/registration",
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
        method: "post",
        url: "user/create",
        data: data,
      });
      return { status: true, data: response.data };
    } catch (error) {
      console.log(error);
      const errorMessage = _.get(
        error,
        "response.data.message",
        JSON.stringify(error)
      );
    }
    return { status: false, data: null };
  }
);

export const getCustomers = createAsyncThunk(
  "common/getCustomers",
  async (data, { dispatch, getState }) => {
    try {
      const response = await api({
        method: "get",
        url: `customer/findAll?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`,
      });
      return { status: true, data: response.data };
    } catch (error) {
      console.log(error);
      const errorMessage = _.get(
        error,
        "response.data.message",
        JSON.stringify(error)
      );
    }
    return { status: false, data: null };
  }
);

export const getSearchCustomers = createAsyncThunk(
  "common/searchCustomers",
  async (data, { dispatch, getState }) => {
    try {
      const response = await api({
        method: "get",
        url: `customer/searchCustomers?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}&searchText=${data.searchText}`,
      });
      return { status: true, data: response.data };
    } catch (error) {
      console.log(error);
      const errorMessage = _.get(
        error,
        "response.data.message",
        JSON.stringify(error)
      );
    }
    return { status: false, data: null };
  }
);

export const withdrawAmount = createAsyncThunk(
  "common/withdrawAmount",
  async (data, { dispatch, getState }) => {
    try {
      const response = await api({
        method: "post",
        url: `transactions/withdrawAmount`,
        data: data,
      });
      console.log(response.data);

      return { status: true, data: response.data.transactions };
    } catch (error) {
      console.log(error);
      const errorMessage = _.get(error, "response.data");
      return { status: false, message: errorMessage.errorMessage };
    }
  }
);

export const depositeAmount = createAsyncThunk(
  "common/depositeAmount",
  async (data, { dispatch, getState }) => {
    try {
      const response = await api({
        method: "post",
        url: `transactions/depositeAmount`,
        data: data,
      });
      console.log(response.data);

      return { status: true, data: response.data.transactions };
    } catch (error) {
      console.log(error);
      const errorMessage = _.get(error, "response.data");
      return { status: false, message: errorMessage.errorMessage };
    }
  }
);

export const getTransactions = createAsyncThunk(
  "common/getTransactions",
  async (data, { dispatch, getState }) => {
    try {
      const response = await api({
        method: "get",
        url: `transactions/findbyCustomerId?pageNumber=${
          data.pageNumber
        }&pageSize=${data.pageSize}&customerId=${data.customerId}&startDate=${
          data.startDate ? data.startDate : ""
        }&endDate=${data.endDate ? data.endDate : ""}`,
      });
      return { status: true, data: response.data };
    } catch (error) {
      console.log(error);
      const errorMessage = _.get(
        error,
        "response.data.message",
        JSON.stringify(error)
      );
    }
    return { status: false, data: null };
  }
);

export const getCustomer = createAsyncThunk(
  "common/getCustomer",
  async (data, { dispatch, getState }) => {
    try {
      const response = await api({
        method: "get",
        url: `customer/searchCustomer?id=${data.customerId}`,
      });
      return { status: true, data: response.data };
    } catch (error) {
      console.log(error);
      const errorMessage = _.get(
        error,
        "response.data.message",
        JSON.stringify(error)
      );
    }
    return { status: false, data: null };
  }
);

export const getEmployees = createAsyncThunk(
  "common/getEmployees",
  async (data, { dispatch, getState }) => {
    try {
      const response = await api({
        method: "get",
        url: `user/findAllEmployees?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`,
      });
      return { status: true, data: response.data };
    } catch (error) {
      console.log(error);
      const errorMessage = _.get(
        error,
        "response.data.message",
        JSON.stringify(error)
      );
    }
    return { status: false, data: null };
  }
);

export const getSearchEmployees = createAsyncThunk(
  "common/searchCustomers",
  async (data, { dispatch, getState }) => {
    try {
      const response = await api({
        method: "get",
        url: `user/searchEmployees?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}&searchText=${data.searchText}`,
      });
      return { status: true, data: response.data };
    } catch (error) {
      console.log(error);
      const errorMessage = _.get(
        error,
        "response.data.message",
        JSON.stringify(error)
      );
    }
    return { status: false, data: null };
  }
);

export const addEmployee = createAsyncThunk(
  "common/addEmployee",
  async (userdata, { dispatch, getState }) => {
    try {
      var data = {
        id: userdata.userId ? userdata.userId : null,
        newPassword: userdata.password,
        userType: userdata.role,
        employee: {
          firstName: userdata.firstName,
          lastName: userdata.lastName,
          age: userdata.age,
          address: userdata.address,
          country: userdata.country,
          email: userdata.email,
          phoneNo: userdata.phoneNo,
        },
      };
      const response = await api({
        method: "post",
        url: "user/addEmployee",
        data: data,
      });
      return { status: true, data: response.data };
    } catch (error) {
      console.log(error);
      const errorMessage = _.get(
        error,
        "response.data.message",
        JSON.stringify(error)
      );
    }
    return { status: false, data: null };
  }
);

export const getUser = createAsyncThunk(
  "common/getUser",
  async (data, { dispatch, getState }) => {
    try {
      const response = await api({
        method: "get",
        url: `user/findUserById?id=${data.userId}`,
      });
      return { status: true, data: response.data };
    } catch (error) {
      console.log(error);
      const errorMessage = _.get(
        error,
        "response.data.message",
        JSON.stringify(error)
      );
    }
    return { status: false, data: null };
  }
);

export const updatePassword = createAsyncThunk(
  "common/updatePassword",
  async (userdata, { dispatch, getState }) => {
    try {
      var data = {
        id: userdata.id,
        newPassword: userdata.password,
        currentPassword: userdata.currentPassword,
      };
      const response = await api({
        method: "post",
        url: "user/updatePassword",
        data: data,
      });
      return { ...response.data };
    } catch (error) {
      console.log(error);
    }
    return { status: false, message: "fail to update" };
  }
);

export const verifyAccount = createAsyncThunk(
  "common/verifyAccount",
  async (data, { dispatch, getState }) => {
    try {
      const response = await api({
        method: "get",
        url: `customer/findByAccountNo?accountNo=${data.accountNo}`,
      });
      return { status: true, data: response.data };
    } catch (error) {
      console.log(error);
      const errorMessage = _.get(
        error,
        "response.data.message",
        JSON.stringify(error)
      );
    }
    return { status: false, data: null };
  }
);

export const transferAmount = createAsyncThunk(
  "common/transferAmount",
  async (data, { dispatch, getState }) => {
    const state = getState();
    try {
      const response = await api({
        method: "post",
        url: `transactions/transferAmount`,
        data: data,
      });
      console.log(response.data);

      const userdata = state?.auth?.user;
      if (userdata) {
        const userResponse = await api({
          method: "get",
          url: `user/findByUsername?username=${userdata.username}`,
        });
        dispatch(authSlice.setUser(userResponse.data));
      }
      return { status: true, data: response.data.transaction };
    } catch (error) {
      console.log(error);
      const errorMessage = _.get(error, "response.data");
      return { status: false, message: errorMessage.errorMessage };
    }
  }
);
