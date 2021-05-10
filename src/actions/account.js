import { GETACCOUNT, GETORDERS, GETAVATAR, POSTAVATAR, PUTACCOUNT } from '../constants/actionTypes';
import * as api from '../api/index.js';

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

    dispatch({ type: GETAVATAR,  data });

  } catch (error) {
    console.log(error);
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