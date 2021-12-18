import { GETPRODUCTS, ERRORGETPRODUCTS, REQUESTPRICE, GETREQUESTPRICE } from '../constants/actionTypes';

export default (state = {products: [], requestedProductPrice: []}, action) => {
  switch (action.type) {
    case GETPRODUCTS:
      const {products, count} = action.payload
      return {...state, products, count};
    case ERRORGETPRODUCTS:
      return {...state, errorGetProducts: action.payload}
    case GETREQUESTPRICE:
      return {...state, requestedProductPrice: action.payload}
    case REQUESTPRICE:
      state.requestedProductPrice.push(action.payload)

      return {...state, requestPriceSuccess: true}
    default:
      return state;
  }
};