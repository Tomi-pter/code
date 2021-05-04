import { UPDATECARDS, ADDCARD, ERRORCARD, DEFAULTCARD } from '../constants/actionTypes';

const cardsReducer = (state = { cardsData: [] }, action) => {
  switch (action.type) {
    case UPDATECARDS:

      return { ...state, cardsData: action.payload.data, cardError: null };
    case ADDCARD: 

      return { ...state, addedCard: action.payload.data, cardError: null };
    case ERRORCARD: 

      return { ...state, cardError: action.payload };
    
    case DEFAULTCARD:

      return { ...state, customerData: action.payload };
    default:
      return state;
  }
};

export default cardsReducer;