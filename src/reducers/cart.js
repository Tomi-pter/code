import * as actionType from '../constants/actionTypes';

const cartReducer = (state = { cartData: [] }, action) => {
    switch (action.type) {
        case actionType.UPDATECART:
          
          return { ...state, cartData: action.payload, countData: action.payload };
        case actionType.UPDATECOUNT:
          
          return { ...state, countData: action.payload, cartData: action.payload };
        case actionType.CHECKOUTCART:

          return { ...state, checkoutDetail: action.payload };
        case actionType.SETDISCOUNT:

          return { ...state, discountDetail: action.payload };
        case actionType.CLEARCART:

          return { ...state, cartData: [], countData: [], checkoutDetail: null, discountDetail: null };
        default:
          return state;
      }
    };
    
export default cartReducer;