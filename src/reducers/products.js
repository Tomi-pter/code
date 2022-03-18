import { 
  GETPRODUCTS, 
  ERRORGETPRODUCTS, 
  REQUESTSTOCK, 
  REQUESTSTOCKERROR, 
  GETREQUESTPRICE, 
  GETPRODUCTSV2,
  GETFAVPRODUCTSV2
} from '../constants/actionTypes';

export default (state = {products: [], requestedProductPrice: [], productsv2: null, favproductv2: null}, action) => {
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
    case GETPRODUCTSV2:
      return {...state, productsv2: action.payload};
    case GETFAVPRODUCTSV2:
      return {...state, favproductv2: action.payload};
    default:
      return state;
  }
};