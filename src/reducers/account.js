import * as actionType from "../constants/actionTypes";

const initialState = {
  accountData: {},
  accountOrders: [],
  avatarData: []
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GETACCOUNT:
      return { ...state, accountData: action.data };
    case actionType.GETORDERS:
      return { ...state, accountOrders: action.data };
    case actionType.PUTACCOUNT:
      return { ...state, accountData: action.data };
    case actionType.CHANGEPASSWORD:
      return { ...state, accountData: action.data };
    case actionType.POSTAVATAR:
      return { ...state, avatarData: action.data };
    case actionType.GETAVATAR:
      return { ...state, avatarData: action.data };
      case actionType.ERRORAVATAR:
      return { ...state, errorAvatar: action.data };
    default:
      return state;
  }
};

export default accountReducer;
