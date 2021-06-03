import { UPDATECART, CHECKOUTCART, SETDISCOUNT } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const getCart = (username) => async (dispatch) => {
  try {
    const { data } = await api.getCart(username);
    
    dispatch({ type: UPDATECART, payload: data.items || [] });

  } catch (error) {
    console.log(error.message);
  }
};

export const addCart = (username, product) => async (dispatch) => {
    try {
        
      const { data } = await api.addCart(username, product);

      dispatch({ type: UPDATECART, payload: data.items });
  
    } catch (error) {
      console.log(error.message);
    }
};

export const updateCart = (username, product) => async (dispatch) => {
  try {
      
    const { data } = await api.updateCart(username, product);

    dispatch({ type: UPDATECART, payload: data.items });

  } catch (error) {
    console.log(error.message);
  }
};

export const removeCart = (username, productId) => async (dispatch) => {
    try {
        
      const { data } = await api.removeCart(username, productId);

      dispatch({ type: UPDATECART, payload: data.items });
  
    } catch (error) {
      console.log(error.message);
    }
};

export const discount = (couponId) => async (dispatch) => {
  try {
    const { data } = await api.discount(couponId);

    dispatch({ type: SETDISCOUNT, payload: data });
    
  } catch (error) {
    const data = {'valid': false, 'error': true};

    dispatch({ type: SETDISCOUNT, payload: data  });
  }
};

export const checkout = (checkoutDetail, router) => async (dispatch) => {
  try {

    dispatch({ type: CHECKOUTCART, payload: checkoutDetail });
    router.push('/payment');
  } catch (error) {
    console.log(error.message);
  }
};