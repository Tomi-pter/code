import { GETPRODUCTS, ERRORGETPRODUCTS, REQUESTSTOCK, REQUESTSTOCKERROR, GETREQUESTPRICE } from '../constants/actionTypes';

export default (state = {products: [], requestedProductPrice: []}, action) => {
  switch (action.type) {
    case GETPRODUCTS:
      const {products, count} = action.payload
      
      return {...state, products, count};
    case ERRORGETPRODUCTS:
      return {...state, errorGetProducts: action.payload}
    case GETREQUESTPRICE:
      return {...state, requestedProductPrice: action.payload}
    case REQUESTSTOCK:
      state.requestedProductPrice.push(action.payload)

      return {...state, requestStockSuccess: true}
    case REQUESTSTOCKERROR: 
      return {...state, requestStockSuccess: false}
    default:
      return state;
  }
};