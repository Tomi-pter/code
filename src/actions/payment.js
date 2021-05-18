import { PAYMENT } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const payment = (username, formData, router) => async (dispatch) => {
    try {
      const { data } = await api.payment(username, formData);

      dispatch({ type: PAYMENT, data });
        
      router.push('/payment-confirmation');
    } catch (error) {
      const data = error.response.data;

      dispatch({ type: PAYMENT, data });
    }
};

export const paymentByTerms = (username, formData, router) => async (dispatch) => {
  try {
    const { data } = await api.paymentByTerms(username, formData);
    console.log('sucess', data);
    dispatch({ type: PAYMENT, data });
      
    router.push('/payment-confirmation');
  } catch (error) {
    const data = error.response.data;
    
    dispatch({ type: PAYMENT, data });
  }
};