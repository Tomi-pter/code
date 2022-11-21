import {
  GETUSERS,
  GETUSER,
  GETCUSTOMPRODUCTS,
  RESETCUSTOMPRODUCTS,
  CREATECUSTOMPRODUCT,
  CUSTOMPRODUCTERROR,
  UPDATECUSTOMPRODUCT,
  REMOVECUSTOMPRODUCT,
  LOGINADMINUSER,
  LOGINERROR,
  LOGINADMIN,
  LOGINADMINERROR,
  CONFIRMUSER,
  CONFIRMUSERERROR,
  ENABLEUSER,
  ENABLEUSERERROR,
  DISABLEUSER,
  DISABLEUSERERROR,
  IMPORTUSER,
  IMPORTUSERERROR,
  EXPORTCSV,
  UPDATEUSERNETSUITEID,
  SYNCCUSTOMPRICING,
  SYNCCUSTOMPRICINGERROR,
  SYNCPRODUCTS,
  SYNCPRODUCTSERROR,
  CREATESUBACCOUNT,
  CREATESUBACCOUNTERROR,
  GETCUSTOMPRODUCTNETSUITE,
  UPSERTCUSTOMPRODUCTNETSUITE,
  REMOVECUSTOMPRODUCTNETSUITE,
  UPSERTCUSTOMPRODUCTNETSUITEERROR,
  REMOVECUSTOMPRODUCTNETSUITEERROR,
  GETORDERLOGS,
  GETPRODUCTQUEUE,
  UPSERTPRODUCTTOQUEUE,
  GETAUTOMATIONDATE,
  SETAUTOMATIONDATE,
  GETGROUPPRICING,
  GETGROUPPRICINGBYID,
  CREATEGROUPPRICING,
  ADDGROUPPRICINGPRODUCT,
  EDITGROUPPRICINGPRODUCT,
  DELETEGROUPPRICINGPRODUCT,
  ADDGROUPPRICINGUSER,
  REMOVEGROUPPRICINGUSER,
} from "../constants/actionTypes";

import * as api from "../api/index.js";

export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await api.getUsers();

    dispatch({ type: GETUSERS, data });
  } catch (error) {
    console.log(error);
  }
};

export const getUser = (user) => async (dispatch) => {
  try {
    const { data: userInfo } = await api.getAccount(user.username);

    const newData = { ...user, information: userInfo };

    dispatch({ type: GETUSER, data: newData });
  } catch (error) {
    console.log(error);
  }
};

export const getCustomProducts = (username) => async (dispatch) => {
  try {
    const { data } = await api.getCustomProducts(username);

    dispatch({ type: GETCUSTOMPRODUCTS, data });
  } catch (error) {
    console.log(error);
  }
};

export const resetCustomProducts = () => async (dispatch) => {
  try {
    dispatch({ type: RESETCUSTOMPRODUCTS });
  } catch (error) {
    console.log(error);
  }
};

export const createCustomProduct = (formData) => async (dispatch) => {
  try {
    const { data } = await api.createCustomProduct(formData);

    dispatch({ type: CREATECUSTOMPRODUCT, data });
  } catch (error) {
    const data = error.response.data;

    dispatch({ type: CUSTOMPRODUCTERROR, data });
  }
};

export const updateCustomProduct = (id, formData) => async (dispatch) => {
  try {
    const { data } = await api.updateCustomProduct(id, formData);

    dispatch({ type: UPDATECUSTOMPRODUCT, data });
  } catch (error) {
    // console.log(error);
    const data = error.response.data;

    dispatch({ type: CUSTOMPRODUCTERROR, data });
  }
};

export const removeCustomProduct = (id) => async (dispatch) => {
  try {
    await api.removeCustomProduct(id);

    dispatch({ type: REMOVECUSTOMPRODUCT, id });
  } catch (error) {
    console.log(error);
  }
};

export const loginAdminUser = (formData, profile) => async (dispatch) => {
  try {
    if (profile) {
      await api.logOut(profile.username);
      localStorage.removeItem("profile");
    }

    const { data } = await api.loginAdminUser(formData);

    dispatch({ type: LOGINADMINUSER, data });

    window.open("/shop", "_blank");
  } catch (error) {
    dispatch({ type: LOGINERROR });
  }
};

export const loginAdmin = (formData, route) => async (dispatch) => {
  try {
    const { data } = await api.loginAdmin(formData);

    dispatch({ type: LOGINADMIN, data });

    route.push("/admin");
  } catch (error) {
    dispatch({
      type: LOGINADMINERROR,
      data: { message: "Login Error. Try again later!" },
    });
  }
};

export const confirmUser = (formData, user) => async (dispatch) => {
  try {
    await api.confirmUser(formData);

    const data = { ...user, UserStatus: "CONFIRMED", status: "CONFIRMED" };

    dispatch({ type: CONFIRMUSER, data });
  } catch (error) {
    const data = { success: false };
    dispatch({ type: CONFIRMUSERERROR, data });
  }
};

export const enableUser = (user) => async (dispatch) => {
  try {
    await api.enableUser(user.username);

    const data = { ...user, isEnabled: true };

    dispatch({ type: ENABLEUSER, data });
  } catch (error) {
    const data = { success: false };
    dispatch({ type: ENABLEUSERERROR, data });
  }
};

export const disableUser = (user) => async (dispatch) => {
  try {
    await api.disableUser(user.username);

    const data = { ...user, isEnabled: false };

    dispatch({ type: DISABLEUSER, data });
  } catch (error) {
    const data = { success: false };
    dispatch({ type: DISABLEUSERERROR, data });
  }
};

export const importUser = (formData) => async (dispatch) => {
  try {
    const { data } = await api.importUser(formData);

    const newData = {
      Username: data.userSub,
      Attributes: [
        {
          Name: "sub",
          Value: data.userSub,
        },
        {
          Name: "email_verified",
          Value: "false",
        },
        {
          Name: "phone_number_verified",
          Value: "false",
        },
        {
          Name: "phone_number",
          Value: formData.phoneNumber,
        },
        {
          Name: "given_name",
          Value: formData.givenName,
        },
        {
          Name: "family_name",
          Value: formData.familyName,
        },
        {
          Name: "email",
          Value: formData.email,
        },
        {
          Name: "custom:company",
          Value: formData.company,
        },
      ],
      Enabled: true,
      UserStatus: "UNCONFIRMED",
    };

    dispatch({ type: IMPORTUSER, data: newData });
  } catch (error) {
    const { data } = error.response;
    dispatch({ type: IMPORTUSERERROR, data });
  }
};

export const exportCSV = () => async (dispatch) => {
  try {
    const { data } = await api.exportCSV();

    dispatch({ type: EXPORTCSV, data });
  } catch (error) {
    dispatch({ type: EXPORTCSV, data: [] });
  }
};

export const updateUserNetsuiteID =
  (username, formData) => async (dispatch) => {
    try {
      const { data } = await api.updateUserNetsuiteID(username, formData);

      dispatch({ type: UPDATEUSERNETSUITEID, data });
    } catch (error) {
      console.log("Error Update User Netsuite ID");
    }
  };

export const syncCustomPricing = (username) => async (dispatch) => {
  try {
    const { data } = await api.syncCustomPricing(username);

    dispatch({ type: SYNCCUSTOMPRICING, data });
  } catch (error) {
    dispatch({
      type: SYNCCUSTOMPRICINGERROR,
      data: "Error syncing custom pricing!",
    });
  }
};

export const syncProducts = () => async (dispatch) => {
  try {
    const { data } = await api.syncProducts();

    dispatch({ type: SYNCPRODUCTS, data });
  } catch (error) {
    dispatch({ type: SYNCPRODUCTSERROR, data: "Error syncing products!" });
  }
};

export const createSubAccount = (formData) => async (dispatch) => {
  try {
    const { data } = await api.createSubAccount(formData);

    const newData = {
      username: data.userSub,
      email: formData.email,
      company: formData.company,
      status: "UNCONFIRMED",
      subAccount: true,
      netsuiteId: "",
      customerId: "",
      awsNetsuiteId: formData.netsuiteCustomerId,
    };

    dispatch({ type: CREATESUBACCOUNT, data: newData });
  } catch (error) {
    const { data } = error.response;

    dispatch({ type: CREATESUBACCOUNTERROR, data });
  }
};

export const getCustomProjectsNetsuite = (username) => async (dispatch) => {
  try {
    const { data } = await api.getCustomProjectsNetsuite(username);

    dispatch({ type: GETCUSTOMPRODUCTNETSUITE, data });
  } catch (error) {
    console.log(error);
  }
};

export const upsertCustomProjectsNetsuite =
  (username, formData) => async (dispatch) => {
    try {
      await api.upsertCustomProjectsNetsuite(username, formData);

      dispatch({ type: UPSERTCUSTOMPRODUCTNETSUITE, data: formData });
    } catch (error) {
      const data = error.response.data;

      dispatch({ type: UPSERTCUSTOMPRODUCTNETSUITEERROR, data });
    }
  };

export const removeCustomProjectsNetsuite =
  (username, formData) => async (dispatch) => {
    try {
      await api.removeCustomProjectsNetsuite(username, formData);

      dispatch({ type: REMOVECUSTOMPRODUCTNETSUITE, data: formData });
    } catch (error) {
      const data = error.response.data;
      dispatch({ type: REMOVECUSTOMPRODUCTNETSUITEERROR, data });
    }
  };

export const getOrderLogs = () => async (dispatch) => {
  try {
    const { data } = await api.getOrderLogs();

    dispatch({ type: GETORDERLOGS, data });
  } catch (error) {
    console.log(error);
  }
};

export const getProductQueue = () => async (dispatch) => {
  try {
    const { data } = await api.getProductQueue();

    dispatch({ type: GETPRODUCTQUEUE, data });
  } catch (error) {
    console.log(error);
  }
};

export const upsertProductToQueue = (product) => async (dispatch) => {
  try {
    const { data } = await api.upsertProductToQueue(product);

    dispatch({ type: UPSERTPRODUCTTOQUEUE, data });
  } catch (error) {
    console.log(error);
  }
};

export const getAutomationDate = () => async (dispatch) => {
  try {
    const { data } = await api.getAutomationDate();

    dispatch({ type: GETAUTOMATIONDATE, data });
  } catch (error) {
    console.log(error);
  }
};

export const setAutomationDate = (automationDate) => async (dispatch) => {
  try {
    const { data } = await api.setAutomationDate(automationDate);

    dispatch({ type: SETAUTOMATIONDATE, data });
  } catch (error) {
    console.log(error);
  }
};

export const getGroupPricing = () => async (dispatch) => {
  try {
    const { data } = await api.getGroupPricing();

    dispatch({ type: GETGROUPPRICING, data });
  } catch (error) {
    console.log(error);
  }
};

export const createGroupPricing = (formData) => async (dispatch) => {
  try {
    const { data } = await api.createGroupPricing(formData);

    dispatch({ type: CREATEGROUPPRICING, data });
  } catch (error) {
    console.log(error);
  }
};

export const addGroupPricingProduct =
  (groupPricingId, formData) => async (dispatch) => {
    try {
      await api.addGroupPricingProduct(groupPricingId, formData);

      dispatch({
        type: ADDGROUPPRICINGPRODUCT,
        data: { groupPricingId, product: formData },
      });
    } catch (error) {
      console.log(error);
    }
  };

export const editGroupPricingProduct =
  (groupPricingId, productId, formData) => async (dispatch) => {
    try {
      await api.editGroupPricingProduct(groupPricingId, productId, {
        price: formData.price,
      });

      dispatch({
        type: EDITGROUPPRICINGPRODUCT,
        data: { groupPricingId, productId, product: formData },
      });
    } catch (error) {
      console.log(error);
    }
  };

export const deleteGroupPricingProduct =
  (groupPricingId, productId) => async (dispatch) => {
    try {
      await api.deleteGroupPricingProduct(groupPricingId, productId);

      dispatch({
        type: DELETEGROUPPRICINGPRODUCT,
        data: { groupPricingId, productId },
      });
    } catch (error) {
      console.log(error);
    }
  };

export const addGroupPricingUser =
  (user, groupPricingId) => async (dispatch) => {
    try {
      await api.addGroupPricingUser(user.username, { groupPricingId });

      dispatch({
        type: ADDGROUPPRICINGUSER,
        data: { user, groupPricingId },
      });
    } catch (error) {
      console.log(error);
    }
  };

export const removeGroupPricingUser =
  (user, groupPricingId) => async (dispatch) => {
    try {
      await api.removeGroupPricingUser(user.username, { groupPricingId });

      dispatch({
        type: REMOVEGROUPPRICINGUSER,
        data: { user, groupPricingId },
      });
    } catch (error) {
      console.log(error);
    }
  };
