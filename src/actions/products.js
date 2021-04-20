import { GETPRODUCTS } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const getProducts = () => async (dispatch) => {
  try {
    const { data } = await api.getProducts();

    dispatch({ type: GETPRODUCTS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};