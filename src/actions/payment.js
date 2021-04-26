import { PAYMENT } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const payment = (username, formData, router) => async (dispatch) => {
    try {
      const { data } = await api.payment(username, formData);
      console.log('success', data);
      dispatch({ type: PAYMENT, data });
        
      router.push('/payment-confirmation');
    } catch (error) {
      const data = error.response.data;
      console.log('error', data);
      dispatch({ type: PAYMENT, data });
    }
};