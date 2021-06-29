import { GETUSERS, GETCUSTOMPRODUCTS, RESETCUSTOMPRODUCTS, CREATECUSTOMPRODUCT, UPDATECUSTOMPRODUCT, REMOVECUSTOMPRODUCT } from '../constants/actionTypes';

const adminReducer = (state = { users: [], customProducts: [] }, action) => {
  switch (action.type) {
    case GETUSERS:

        return {...state, users: action.data.Users};
    case GETCUSTOMPRODUCTS:

        return {...state, customProducts: action.data}
    case RESETCUSTOMPRODUCTS:

        return {...state, customProducts: [] }
    case CREATECUSTOMPRODUCT:
        state.customProducts.push(action.data)

        return {...state, createError: null }
    case UPDATECUSTOMPRODUCT:
        const index = state.customProducts.findIndex(product => product.customPricingId  === action.data.customPricingId);
        if(index !== -1) {
            state.customProducts.splice(index, 1, action.data);
        }

        return { ...state, updateError: null};
    case REMOVECUSTOMPRODUCT:
        const newCustomProducts = state.customProducts.filter((product) => product.customPricingId !== action.id)
      
        return { ...state, customProducts: newCustomProducts };
    default:
        return state;
  }
};

export default adminReducer;