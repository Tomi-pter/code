import { GETACCOUNT } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getAccount = (username) => async (dispatch) => {
  try {
    const { data } = await api.getAccount(username);

    dispatch({ type: GETACCOUNT, data });

  } catch (error) {
    console.log(error);
  }
};