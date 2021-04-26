import * as actionType from '../constants/actionTypes';

const paymentReducer = (state = { paymentData: null }, action) => {
  switch (action.type) {
    case actionType.PAYMENT:

      return { ...state, paymentData: action.data };
    default:
      return state;
  }
};

export default paymentReducer;
