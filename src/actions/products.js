import { GETPRODUCTS } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const getProducts = (name, category, subCategory) => async (dispatch) => {
  try {
    const { data } = await api.getProducts(name, category, subCategory);

    dispatch({ type: GETPRODUCTS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};