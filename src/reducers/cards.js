import { UPDATECARDS, ADDCARD, REMOVECARD, ERRORCARD, DEFAULTCARD } from '../constants/actionTypes';

const cardsReducer = (state = { cardsData: [] }, action) => {
  switch (action.type) {
    case UPDATECARDS:

      return { ...state, cardsData: action.payload.data, cardError: null };
    case ADDCARD: 
      state.cardsData.push(action.payload)

      return { ...state, cardError: null };
    case REMOVECARD:
      const newCardsData = state.cardsData.filter((card) => card.id !== action.payload.id)

      return { ...state, cardsData: newCardsData, cardError: null };
    case ERRORCARD: 

      return { ...state, cardError: action.payload };
    
    case DEFAULTCARD:

      return { ...state, customerData: action.payload };
    default:
      return state;
  }
};

export default cardsReducer;