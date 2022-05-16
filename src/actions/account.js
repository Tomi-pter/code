import {
  GETACCOUNT,
  GETNETSUITEACCOUNT,
  GETORDERS,
  GETORDER,
  GETAVATAR,
  POSTAVATAR,
  ERRORAVATAR,
  PUTACCOUNT,
  CHANGEPASSWORD,
  ERROROLDPASS,
  POSTADDRESSES,
  GETADDRESSES,
  GETADDRESSESBYID,
  DELETEADDRESSESBYID,
  UPDATEADDRESSESBYID,
  UPDATEDEFAULTADDRESS,
  UPDATEEMAIL,
} from "../constants/actionTypes";
import * as api from "../api/index.js";

export const getAccount = (username) => async (dispatch) => {
  try {
    const { data } = await api.getAccount(username);

    dispatch({ type: GETACCOUNT, data });
  } catch (error) {
    console.log(error);
  }
};

export const getNetsuiteAccount = (username) => async (dispatch) => {
  try {
    const { data } = await api.getNetsuiteAccount(username);
    dispatch({ type: GETNETSUITEACCOUNT, data });
  } catch (error) {
    console.log(error);
  }
};

export const putAccount = (username, accountData) => async (dispatch) => {
  try {
    const { data } = await api.putAccount(username, accountData);
    if (data.success) dispatch({ type: PUTACCOUNT, accountData });
  } catch (error) {
    console.log(error);
  }
};

export const updateEmail = (username, formData) => async (dispatch) => {
  try {
    const { data } = await api.updateEmail(username, formData);

    if (data.success) dispatch({ type: UPDATEEMAIL, formData });
  } catch (error) {
    console.log(error);
  }
};

export const getOrders =
  (username, status, page, soNumber) => async (dispatch) => {
    try {
      const { data } = await api.getOrders(username, status, page, soNumber);
      dispatch({ type: GETORDERS, data });
    } catch (error) {
      const data = {
        orders: [],
        total: 0,
        count: 0,
      };
      dispatch({ type: GETORDERS, data });
    }
  };

export const getOrder = (username, orderID) => async (dispatch) => {
  try {
    const { data } = await api.getOrder(username, orderID);
    dispatch({ type: GETORDER, data });
  } catch (error) {
    console.log(error);
  }
};

// Avatar

export const getAvatar = (username) => async (dispatch) => {
  try {
    const { data } = await api.getAvatar(username);
    dispatch({ type: GETAVATAR, data });
  } catch (error) {
    if (error.response && error.response.data !== undefined) {
      const { errorData } = error.response.data;
      dispatch({ type: ERRORAVATAR, errorData });
    }
  }
};

export const postAvatar = (username, image) => async (dispatch) => {
  try {
    const { data } = await api.postAvatar(username, image);
    dispatch({ type: POSTAVATAR, data });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const changePassword = (username, formData) => async (dispatch) => {
  try {
    const { data } = await api.changePassword(username, formData);
    dispatch({ type: CHANGEPASSWORD, data });
  } catch (error) {
    const data = error.response.data;
    dispatch({ type: ERROROLDPASS, data });
  }
};

export const logOutResetPassword = (username, router) => async (dispatch) => {
  try {
    await api.logOut(username);

    router.push("/login");
  } catch (error) {
    console.log(error);
  }
};

// Addresses

export const getAllAddresses = (username) => async (dispatch) => {
  try {
    const { data } = await api.getAllAddresses(username);
    dispatch({ type: GETADDRESSES, data });
  } catch (error) {
    console.log(error);
  }
};

export const getAddressesById = (username, id) => async (dispatch) => {
  try {
    const { data } = await api.getAddressesById(username, id);
    dispatch({ type: GETADDRESSESBYID, data });
  } catch (error) {
    console.log(error);
  }
};

export const addAddresses = (username, formData) => async (dispatch) => {
  try {
    const { data } = await api.addAddresses(username, formData);

    dispatch({
      type: POSTADDRESSES,
      data: { details: data, isDefault: false },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteAddressesById = (username, id) => async (dispatch) => {
  try {
    await api.deleteAddressesById(username, id);
    dispatch({ type: DELETEADDRESSESBYID, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const updateAddressesById =
  (username, address, formData) => async (dispatch) => {
    try {
      const id = address.addressId;
      const { data } = await api.updateAddressesById(username, id, formData);

      dispatch({
        type: UPDATEADDRESSESBYID,
        data: { ...address, details: data },
      });
    } catch (error) {
      console.log(error);
    }
  };

export const makeDefaultAddress = (username, address) => async (dispatch) => {
  try {
    const id = address.addressId;
    await api.makeDefaultAddress(username, id);
    const data = { ...address, isDefault: true };
    dispatch({ type: UPDATEDEFAULTADDRESS, data });
  } catch (error) {
    console.log(error);
  }
};
