import { UPDATECARDS, ADDCARD, ERRORCARD, DEFAULTCARD } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const getCards = (username) => async (dispatch) => {
  try {
    const { data } = await api.getCards(username);

    dispatch({ type: UPDATECARDS, payload: data });

  } catch (error) {
    console.log(error.message);
  }
};

export const getDefaultCard = (username) => async (dispatch) => {
  try {
    const { data } = await api.getDefaultCard(username);

    dispatch({ type: DEFAULTCARD, payload: data });

  } catch (error) {
    console.log(error.message);
  }
};

export const setDefaultCard = (username, id) => async (dispatch) => {
  try {
    const body = {
      "paymentMethodId": id
    }
    const { data } = await api.setDefaultCard(username, body);

    dispatch({ type: DEFAULTCARD, payload: data });

  } catch (error) {
    console.log(error.message);
  }
};

export const addCard = (username, paymentMethod) => async (dispatch) => {
    try {
        
      const { data } = await api.addCard(username, paymentMethod);

      dispatch({ type: ADDCARD, payload: data });
    } catch (error) {
      console.log(error.message);

      const data = error.response.data;
      
      dispatch({ type: ERRORCARD, payload: data });
    }
};