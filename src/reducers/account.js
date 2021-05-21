import * as actionType from "../constants/actionTypes";

const initialState = {
  accountData: {},
  updatedAccountData: [],
  accountOrders: [],
  avatarData: [],
  addressesData: [],
  changePassword: [],
  errorOldPass: [],
  getAddressesById: []
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GETACCOUNT:
      return { ...state, accountData: action.data };
    case actionType.GETFISHBOWLACCOUNT:
      return { ...state, fishbowlAccountData: action.data };
    case actionType.GETORDERS:
      return { ...state, accountOrders: action.data };
    case actionType.PUTACCOUNT:
      const newData = {
        'given_name': action.accountData.given_name,
        'family_name': action.accountData.family_name,
        'phone_number': action.accountData.phone_number,
        'custom:company': action.accountData.company
      }
      return { ...state, accountData: newData };
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
    case actionType.UPDATEADDRESSESBYID:
      const index = state.addressesData.findIndex(address => address.addressId === action.data.addressId);
      if(index !== -1) {
          state.addressesData.splice(index, 1, action.data);
      }
      return { ...state, updateAddressSuccess: true};
    case actionType.UPDATEDEFAULTADDRESS:
      const prevDefault = state.addressesData.find(address => address.isDefault === true);
      const prevIndex = state.addressesData.findIndex(address => address.addressId === prevDefault.addressId);
      if(prevIndex !== -1) {
          state.addressesData.splice(prevIndex, 1, {...prevDefault, isDefault: false});
      }
      const newDefault = action.data;
      const newIndex = state.addressesData.findIndex(address => address.addressId === newDefault.addressId);
      if(newIndex !== -1) {
          state.addressesData.splice(newIndex, 1, newDefault);
      }
      return { ...state, updateAddressDefault: true};
    case actionType.GETADDRESSESBYID:
      return { ...state, getAddressesById: action.data };
    default:
      return state;
  }
};

export default accountReducer;
