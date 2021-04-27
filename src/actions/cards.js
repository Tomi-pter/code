import { UPDATECARDS, ERRORCARD } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const getCards = (username) => async (dispatch) => {
  try {
    const { data } = await api.getCards(username);

    dispatch({ type: UPDATECARDS, payload: data });

  } catch (error) {
    console.log(error.message);
  }
};

export const addCard = (username, paymentMethod) => async (dispatch) => {
    try {
        
      const { data } = await api.addCard(username, paymentMethod);

      dispatch({ type: UPDATECARDS, payload: data });
    } catch (error) {
      console.log(error.message);
      
      const data = error.response.data;
      
      dispatch({ type: ERRORCARD, payload: data });
    }
};