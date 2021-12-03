import { GETPRODUCTS, ERRORGETPRODUCTS, REQUESTPRICE } from '../constants/actionTypes';

export default (products = {products: []}, action) => {
  switch (action.type) {
    case GETPRODUCTS:
      return action.payload;
    case ERRORGETPRODUCTS:
      return {...products, errorGetProducts: action.payload}
    case REQUESTPRICE:
      return {...products, requestPriceSuccess: true}
    default:
      return products;
  }
};