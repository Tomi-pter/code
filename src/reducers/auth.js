import * as actionType from "../constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case actionType.AUTH:
      if (action?.data?.success && action?.data?.accessToken) {
        localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      }

      return { ...state, authData: action.data };
    case actionType.VERIFY:
      return { ...state, verifyData: action.data };
    case actionType.RESEND:
      return { ...state, verifyData: action.data };
    case actionType.LOGOUT:
      localStorage.clear();
    case actionType.FORGOTPASSWORD:
      return { ...state, forgotPasswordData: action.data };
    case actionType.CONFIRMFORGOTPASSWORD:
      return { ...state, forgotPasswordData: action.data };
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;
