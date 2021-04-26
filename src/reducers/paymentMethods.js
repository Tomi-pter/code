import { UPDATEPAYMENTMETHODS } from '../constants/actionTypes';

export default (paymentMethods = [], action) => {
  switch (action.type) {
    case UPDATEPAYMENTMETHODS:
      return action.payload;
    default:
      return paymentMethods;
  }
};