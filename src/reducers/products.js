import { GETPRODUCTS } from '../constants/actionTypes';

export default (products = [], action) => {
  switch (action.type) {
    case GETPRODUCTS:
      return action.payload;
    default:
      return products;
  }
};