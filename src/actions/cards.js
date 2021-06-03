import { GETCARDS, ADDCARD, ERRORCARD, DEFAULTCARD, REMOVECARD } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const getCards = (username) => async (dispatch) => {
  try {
    const { data } = await api.getCards(username);
    const cards = data.cards ? data.cards : []; 
    dispatch({ type: GETCARDS, payload: cards });

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

export const addCard = (username, formData) => async (dispatch) => {
    try {
      const { data } = await api.addCard(username, formData);

      dispatch({ type: ADDCARD, payload: data });
    } catch (error) {
      console.log(error.message);

      const data = error.response.data;
      
      dispatch({ type: ERRORCARD, payload: data });
    }
};

export const removeCard = (username, id) => async (dispatch) => {
  try {
    const { data } = await api.removeCard(username, id);

    dispatch({ type: REMOVECARD, payload: id });
  } catch (error) {
    const data = error.response.data;
    dispatch({ type: ERRORCARD, payload: data });
  }
};