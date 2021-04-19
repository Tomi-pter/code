import { GETACCOUNT } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getAccount = (email, router) => async (dispatch) => {
  try {
    const { data } = await api.getAccount(email);

    dispatch({ type: GETACCOUNT, data });

  } catch (error) {
    console.log(error);
  }
};