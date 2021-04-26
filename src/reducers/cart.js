import * as actionType from '../constants/actionTypes';

const cartReducer = (state = { cartData: [] }, action) => {
    switch (action.type) {
        case actionType.UPDATECART:
        
          return { ...state, cartData: action.payload };
        case actionType.CHECKOUTCART:

          return { ...state, checkoutDetail: action.payload };
        case actionType.SETDISCOUNT:

          return { ...state, discountDetail: action.payload };
        default:
          return state;
      }
    };
    
export default cartReducer;