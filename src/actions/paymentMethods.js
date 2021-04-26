import { UPDATEPAYMENTMETHODS } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const getPaymentMethods = (username) => async (dispatch) => {
  try {
    const { data } = await api.getPaymentMethods(username);

    dispatch({ type: UPDATEPAYMENTMETHODS, payload: data.data });

  } catch (error) {
    console.log(error.message);
  }
};

export const addPaymentMethod = (username, paymentMethod) => async (dispatch) => {
    try {
        
      const { data } = await api.addPaymentMethod(username, paymentMethod);

      dispatch({ type: UPDATEPAYMENTMETHODS, payload: data.data });
  
    } catch (error) {
      console.log(error.message);
    }
};