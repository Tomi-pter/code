import * as actionType from "../constants/actionTypes";

const initialState = {
  accountData: {},
  updatedAccountData: [],
  // accountOrders: [],
  ordersData: null,
  avatarData: "",
  addressesData: [],
  changePassword: null,
  errorOldPass: null,
  getAddressesById: [],
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GETACCOUNT:
      return {
        ...state,
        accountData: action.data,
        changePassword: null,
        errorOldPass: null,
      };
    case actionType.GETNETSUITEACCOUNT:
      return { ...state, netsuiteAccountData: action.data };
    case actionType.GETORDERS:
      return { ...state, ordersData: action.data };
    case actionType.GETORDER:
      const orderIndex = state.ordersData.orders.findIndex(
        (order) => order.id === action.data.id
      );

      if (orderIndex !== -1) {
        state.ordersData.orders.splice(orderIndex, 1, action.data);
      }
      return {
        ...state,
        errorGetOrder: null,
      };
    case actionType.GETPEDIGREE:
      const orderPedigreeIndex = state.ordersData.orders.findIndex(
        (order) => order.salesOrderNumber === action.data.salesOrderNumber
      );

      const newOrderData = {
        ...state.ordersData.orders[orderPedigreeIndex],
        pedigrees: action.data.pedigrees,
      };

      if (orderPedigreeIndex !== -1) {
        state.ordersData.orders.splice(orderPedigreeIndex, 1, newOrderData);
      }

      return {
        ...state,
        errorGetOrderPedigree: null,
      };
    case actionType.PUTACCOUNT:
      const newData = {
        ...state.accountData,
        given_name: action.accountData.given_name,
        family_name: action.accountData.family_name,
        phone_number: action.accountData.phone_number,
        "custom:company": action.accountData.company,
      };
      return { ...state, accountData: newData };
    case actionType.PUTLICENSE:
      const newLicenseData = {
        ...state.accountData,
        stateLicenseNumber: action.licenseData.stateLicenseNumber,
        stateLicenseExpirationDate:
          action.licenseData.stateLicenseExpirationDate,
        dea: action.licenseData.dea,
        deaExpiry: action.licenseData.deaExpiry,
      };
      return { ...state, accountData: newLicenseData };
    case actionType.UPDATEEMAIL:
      const newEmail = {
        ...state.accountData,
        email: action.formData.newEmail,
      };
      return { ...state, accountData: newEmail };
    case actionType.CHANGEPASSWORD:
      return { ...state, changePassword: action.data, errorOldPass: null };
    case actionType.ERROROLDPASS:
      return { ...state, errorOldPass: action.data, changePassword: null };
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
      return { ...state, addAddressSuccess: true };
    case actionType.UPDATEADDRESSESBYID:
      const index = state.addressesData.findIndex(
        (address) => address.addressId === action.data.addressId
      );

      if (index !== -1) {
        state.addressesData.splice(index, 1, action.data);
      }
      return { ...state, updateAddressSuccess: true };
    case actionType.UPDATEDEFAULTADDRESS:
      const prevDefault = state.addressesData.find(
        (address) => address.isDefault === true
      );
      if (prevDefault) {
        const prevIndex = state.addressesData.findIndex(
          (address) => address.addressId === prevDefault.addressId
        );
        if (prevIndex !== -1) {
          state.addressesData.splice(prevIndex, 1, {
            ...prevDefault,
            isDefault: false,
          });
        }
      }
      const newDefault = action.data;
      const newIndex = state.addressesData.findIndex(
        (address) => address.addressId === newDefault.addressId
      );
      if (newIndex !== -1) {
        state.addressesData.splice(newIndex, 1, newDefault);
      }
      return { ...state, updateAddressDefault: true };
    case actionType.UPDATEDEFAULTADDRESSBILLING:
      const prevDefaultBilling = state.addressesData.find(
        (address) => address.isDefaultBilling === true
      );
      if (prevDefaultBilling) {
        const prevIndex = state.addressesData.findIndex(
          (address) => address.addressId === prevDefaultBilling.addressId
        );
        if (prevIndex !== -1) {
          state.addressesData.splice(prevIndex, 1, {
            ...prevDefaultBilling,
            isDefaultBilling: false,
          });
        }
      }
      const newDefaultBilling = action.data;
      const newIndexBilling = state.addressesData.findIndex(
        (address) => address.addressId === newDefaultBilling.addressId
      );
      if (newIndexBilling !== -1) {
        state.addressesData.splice(newIndexBilling, 1, newDefaultBilling);
      }
      return { ...state, updateAddressDefaultBilling: true };
    case actionType.DELETEADDRESSESBYID:
      const newAddressesData = state.addressesData.filter(
        (address) => address.addressId !== action.payload
      );
      return { ...state, addressesData: newAddressesData };
    case actionType.GETADDRESSESBYID:
      return { ...state, getAddressesById: action.data };
    default:
      return state;
  }
};

export default accountReducer;
