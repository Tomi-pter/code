import { UPDATECART } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const getCart = (email) => async (dispatch) => {
  try {
    const { data } = await api.getCart(email);

    dispatch({ type: UPDATECART, payload: data.items });

  } catch (error) {
    console.log(error.message);
  }
};

export const addCart = (email, product) => async (dispatch) => {
    try {
        
      const { data } = await api.addCart(email, product);

      dispatch({ type: UPDATECART, payload: data.items });
  
    } catch (error) {
      console.log(error.message);
    }
};

export const removeCart = (email, productId) => async (dispatch) => {
    try {
        
      const { data } = await api.removeCart(email, productId);

      dispatch({ type: UPDATECART, payload: data.items });
  
    } catch (error) {
      console.log(error.message);
    }
};