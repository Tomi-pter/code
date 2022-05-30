import { PAYMENT } from "../constants/actionTypes";

import * as api from "../api/index.js";

export const payment = (username, formData, router) => async (dispatch) => {
  try {
    const { data } = await api.payment(username, formData);

    dispatch({ type: PAYMENT, data });

    router.push("/payment-confirmation");
  } catch (error) {
    const data = error.response.data;

    dispatch({ type: PAYMENT, data });
  }
};

export const paymentByTerms =
  (username, formData, router) => async (dispatch) => {
    try {
      const { data } = await api.paymentByTerms(username, formData);
      dispatch({ type: PAYMENT, data });

      router.push("/payment-confirmation");
    } catch (error) {
      const data = error.response.data;

      dispatch({ type: PAYMENT, data });
    }
  };

export const paymentViaPaypal =
  (username, formData, router) => async (dispatch) => {
    try {
      const { data } = await api.paymentViaPaypal(username, formData);
      dispatch({ type: PAYMENT, data });

      router.push("/payment-confirmation");
    } catch (error) {
      const data = error.response.data;

      dispatch({ type: PAYMENT, data });
    }
  };
