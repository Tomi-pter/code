import * as actionType from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case actionType.AUTH:

      if (action?.data?.success && action?.data?.accessToken) {
        localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
        localStorage.setItem('cart', JSON.stringify([]));
      }

      return { ...state, authData: action.data };
    case actionType.VERIFY:
      
      if (action?.data.success) {
        return { ...state, authData: null, verifyData: null };
      }

      return { ...state, verifyData: action.data };
    case actionType.RESEND:

      return { ...state, verifyData: action.data };
    case actionType.LOGOUT:
      localStorage.clear();

      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;
