import * as actionType from '../constants/actionTypes';

const accountReducer = (state = { accountData: null }, action) => {
    switch (action.type) {
        case actionType.GETACCOUNT:
    
          return { ...state, accountData: action.data, loading: false };
        default:
          return state;
      }
    };
    
export default accountReducer;