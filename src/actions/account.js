import {
  GETACCOUNT,
  GETORDERS,
  GETAVATAR,
  POSTAVATAR,
  ERRORAVATAR,
  PUTACCOUNT,
  CHANGEPASSWORD,
  POSTADDRESSES,
  GETADDRESSES,
  GETADDRESSESBYID,
  DELETEADDRESSESBYID,
  
} from "../constants/actionTypes";
import * as api from "../api/index.js";

export const getAccount = (username) => async (dispatch) => {
  try {
    const { data } = await api.getAccount(username);

    dispatch({ type: GETACCOUNT, data });
  } catch (error) {
    console.log(error);
  }
};

export const putAccount = (username, accountData) => async (dispatch) => {
  try {
    const { data } = await api.putAccount(username, accountData);
    dispatch({ type: PUTACCOUNT, data });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const getOrders = (username) => async (dispatch) => {
  try {
    const { data } = await api.getOrders(username);
    dispatch({ type: GETORDERS, data });
  } catch (error) {
    console.log(error);
  }
};

// Avatar

export const getAvatar = (username) => async (dispatch) => {
  try {
    const { data } = await api.getAvatar(username);
    dispatch({ type: GETAVATAR, data });
  } catch (error) {
    if (error.response && error.response.data !== undefined) {
      const { errorData } = error.response.data;
      dispatch({ type: ERRORAVATAR, errorData });
    }
  }
};

export const postAvatar = (username, image) => async (dispatch) => {
  try {
    const { data } = await api.postAvatar(username, image);
    dispatch({ type: POSTAVATAR, data });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const changePassword = (username, formData) => async (dispatch) => {
  try {
    const { data } = await api.changePassword(username, formData);
    dispatch({ type: CHANGEPASSWORD, data });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

// Addresses

export const getAllAddresses = (username) => async (dispatch) => {
  try {
    const { data } = await api.getAllAddresses(username);
    dispatch({ type: GETADDRESSES, data });
  } catch (error) {
    console.log(error);
  }
};

export const getAddressesById = (username, id) => async (dispatch) => {
  try {
    const { data } = await api.getAddressesById(username, id);
    dispatch({ type: GETADDRESSESBYID, data });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const addAddresses = (username, formData) => async (dispatch) => {
  try {
    const { data } = await api.addAddresses(username, formData);
    dispatch({ type: POSTADDRESSES, data });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const deleteAddressesById = (username, id) => async (dispatch) => {
  try {
    const { data } = await api.deleteAddressesById(username, id);
    dispatch({ type: DELETEADDRESSESBYID, data });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};