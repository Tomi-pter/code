import { GETACCOUNT, GETORDERS } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getAccount = (username) => async (dispatch) => {
  try {
    const { data } = await api.getAccount(username);

    dispatch({ type: GETACCOUNT, data });

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