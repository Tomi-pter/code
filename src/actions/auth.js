import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const logIn = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.logIn(formData);

    dispatch({ type: AUTH, data });

    router.push('/account');
  } catch (error) {
    console.log(error);
  }
};

export const signUp = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    // dispatch({ type: AUTH, data });

    // router.push('/account');
  } catch (error) {
    console.log(error);
  }
};
