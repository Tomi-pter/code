import * as actionType from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case actionType.AUTH:

      if (action?.data?.success && action?.data?.accessToken) {
        localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      }

      return { ...state, authData: action.data, loading: false };
    case actionType.VERIFY:
      
      if (action?.data.success) {
        return { ...state, authData: null, verifyData: null, loading: false };
      }

      return { ...state, verifyData: action.data, loading: false };
    case actionType.RESEND:

      return { ...state, verifyData: action.data, loading: false };
    case actionType.LOGOUT:
      localStorage.clear();

      return { ...state, authData: null, loading: false };
    default:
      return state;
  }
};

export default authReducer;
