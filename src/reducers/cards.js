import { GETCARDS, ADDCARD, REMOVECARD, ERRORCARD, DEFAULTCARD } from '../constants/actionTypes';

const cardsReducer = (state = { cardsData: [] }, action) => {
  switch (action.type) {
    case GETCARDS:

      return { ...state, cardsData: action.payload, cardError: null };
    case ADDCARD: 
      state.cardsData.push(action.payload.result.card)

      return { ...state, cardError: null };
    case REMOVECARD:
      const newCardsData = state.cardsData.filter((card) => card.id !== action.payload)

      return { ...state, cardsData: newCardsData, cardError: null };
    case ERRORCARD: 

      return { ...state, cardError: action.payload };
    
    case DEFAULTCARD:

      return { ...state, defaultCard: action.payload };
    default:
      return state;
  }
};

export default cardsReducer;