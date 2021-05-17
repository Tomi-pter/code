import * as actionType from "../constants/actionTypes";

const initialState = {
  accountData: {},
  updatedAccountData: [],
  accountOrders: [],
  avatarData: [],
  addressesData: [],
  changePassword: [],
  errorOldPass: []
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GETACCOUNT:
      return { ...state, accountData: action.data };
    case actionType.GETORDERS:
      return { ...state, accountOrders: action.data };
    case actionType.PUTACCOUNT:
      return { ...state, updatedAccountData: action.data };
    case actionType.CHANGEPASSWORD:
      return { ...state, changePassword: action.data };
    case actionType.ERROROLDPASS:
      return { ...state, errorOldPass: action.data };
    case actionType.POSTAVATAR:
      return { ...state, avatarData: action.data };
    case actionType.GETAVATAR:
      return { ...state, avatarData: action.data };
    case actionType.ERRORAVATAR:
      return { ...state, errorAvatar: action.data };
    case actionType.GETADDRESSES:
      return { ...state, addressesData: action.data };
    case actionType.POSTADDRESSES:
      state.addressesData.push(action.data);
      return { ...state, addAddressSuccess: true};
    case actionType.GETADDRESSESBYID:
      return { ...state, addressesData: action.data };
    default:
      return state;
  }
};

export default accountReducer;
