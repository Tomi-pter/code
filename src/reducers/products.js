import { GETPRODUCTS, ERRORGETPRODUCTS } from '../constants/actionTypes';

export default (products = {products: []}, action) => {
  switch (action.type) {
    case GETPRODUCTS:
      return action.payload;
    case ERRORGETPRODUCTS:
      return {...products, errorGetProducts: action.payload}
    default:
      return products;
  }
};