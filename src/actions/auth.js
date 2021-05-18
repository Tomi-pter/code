import { AUTH, VERIFY, RESEND, LOGOUT, FORGOTPASSWORD, CONFIRMFORGOTPASSWORD } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const logIn = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.logIn(formData);

    dispatch({ type: AUTH, data });

    router.push('/account');
  } catch (error) {
    const data = error.response.data;

    dispatch({ type: AUTH, data });

    // if (data?.accountStatus === "UNCONFIRMED") router.push('/account-verification');
  }
};

export const logOut = (username, router) => async (dispatch) => {
  try {
    const { data } = await api.logOut(username);

    dispatch({ type: LOGOUT, data });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};

export const signUp = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    // router.push('/account-verification');
  } catch (error) {
    const data = error.response.data;

    dispatch({ type: AUTH, data });
  }
};

export const verifyAccount = (formData, router) => async (dispatch) => {
  try {

    const { data } = await api.verifyAccount(formData);
    if (data.success) dispatch(logIn(formData, router));
    // if (data.data.success) logIn(formData, router);

    // if (data.data.success) {
    //   const { data } = await api.logIn(formData);

    //   dispatch({ type: AUTH, data });

    //   router.push('/account');
    // }

    // console.log(data);
    // dispatch({ type: VERIFY, data });

    // router.push('/account');
  } catch (error) {
    const data = error.response.data;

    dispatch({ type: VERIFY, data });
  }
};

export const resendCode = (email) => async (dispatch) => {
  try {

    const { data } = await api.resendCode(email);

    dispatch({ type: RESEND, data });

  } catch (error) {
    const data = error.response.data;

    dispatch({ type: RESEND, data });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {

    const { data } = await api.forgotPassword(email);

    dispatch({ type: FORGOTPASSWORD, data });
    console.log(data);

  } catch (error) {
    const data = error.response.data;

    dispatch({ type: FORGOTPASSWORD, data });
  }
};
export const confirmForgotPassword = (username, formData) => async (dispatch) => {
  try {

    const { data } = await api.confirmForgotPassword(username, formData);

    dispatch({ type: CONFIRMFORGOTPASSWORD, data });
    console.log(data);
  } catch (error) {
    const data = error.response.data;
    dispatch({ type: CONFIRMFORGOTPASSWORD, data });
    console.log(data);
  }
};
