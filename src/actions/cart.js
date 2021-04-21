import { UPDATECART } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const getCart = () => async (dispatch) => {
  try {
    const data = await api.getCart();

    dispatch({ type: UPDATECART, payload: data });

  } catch (error) {
    console.log(error.message);
  }
};

export const addCart = (product, qty) => async (dispatch) => {
    try {
        
      const data = await api.addCart(product, qty);

      dispatch({ type: UPDATECART, payload: data });
  
    } catch (error) {
      console.log(error.message);
    }
};

export const removeCart = (id) => async (dispatch) => {
    try {
        
      const data = await api.removeCart(id);

      dispatch({ type: UPDATECART, payload: data });
  
    } catch (error) {
      console.log(error.message);
    }
};