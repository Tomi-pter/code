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
      // const cartIFrame = document.getElementById('hidden-iframe');
      // cartIFrame.contentWindow.postMessage(localStorage.removeItem('profile'), process.env.REACT_APP_HOMEPAGE_URL);
      localStorage.removeItem('profile');
      // localStorage.clear();
      return state;
    case actionType.FORGOTPASSWORD:
      return { ...state, sendOTP: action.data };
    case actionType.CONFIRMFORGOTPASSWORD:
      return { ...state, forgotPasswordData: action.data };
    case actionType.GETCOUNTRIES:
      return { ...state, countriesData: action.data, authData: {...state.authData, message: ''} }
    case actionType.GETSTATES:
      return { ...state, statesData: action.data }
    default:
      return state;
  }
};

export default authReducer;
