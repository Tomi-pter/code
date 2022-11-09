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
} from "../constants/actionTypes";

const adminReducer = (
  state = {
    users: [],
    customProducts: null,
    customProductNetsuite: [],
    logs: [],
    productQueue: [],
    cronMinutes: null,
    cronHours: null,
    cronDayOfWeek: null,
    groupPricingList: [],
  },
  action
) => {
  switch (action.type) {
    case GETUSERS:
      return { ...state, users: action.data.Users };
    case GETUSER:
      const getUserIndex = state.users.findIndex(
        (user) => user.username === action.data.username
      );

      if (getUserIndex !== -1) {
        state.users.splice(getUserIndex, 1, action.data);
      }

      return { ...state, getUserError: null };
    case GETCUSTOMPRODUCTS:
      return { ...state, customProducts: action.data, loginError: false };
    case RESETCUSTOMPRODUCTS:
      return { ...state, customProducts: [] };
    case CREATECUSTOMPRODUCT:
      state.customProducts.push(action.data);

      return { ...state, error: null };
    case CUSTOMPRODUCTERROR:
      return { ...state, error: action.data };
    case UPDATECUSTOMPRODUCT:
      const index = state.customProducts.findIndex(
        (product) => product.customPricingId === action.data.customPricingId
      );
      if (index !== -1) {
        state.customProducts.splice(index, 1, action.data);
      }

      return { ...state, error: null };
    case REMOVECUSTOMPRODUCT:
      const newCustomProducts = state.customProducts.filter(
        (product) => product.customPricingId !== action.id
      );

      return { ...state, customProducts: newCustomProducts };
    case LOGINADMINUSER:
      if (
        action?.data?.success &&
        action?.data?.AuthenticationResult?.AccessToken
      ) {
        localStorage.setItem(
          "profile",
          JSON.stringify({
            ...action?.data,
            accessToken: action?.data?.AuthenticationResult?.AccessToken,
          })
        );
      }
      return {
        ...state,
        authData: {
          ...action?.data,
          accessToken: action?.data?.AuthenticationResult?.AccessToken,
        },
        loginError: false,
      };
    case LOGINERROR:
      return { ...state, loginError: true };
    case LOGINADMIN:
      localStorage.setItem("admin", JSON.stringify(action?.data));

      return { ...state, adminAuthData: action?.data, adminLoginError: null };
    case LOGINADMINERROR:
      return { ...state, adminLoginError: action?.data };
    case CONFIRMUSER:
      const userIndex = state.users.findIndex(
        (user) => user.username === action.data.username
      );

      if (userIndex !== -1) {
        state.users.splice(userIndex, 1, action.data);
      }

      return { ...state, confirmError: null };
    case CONFIRMUSERERROR:
      return { ...state, confirmError: action?.data };
    case ENABLEUSER:
      const enableUserIndex = state.users.findIndex(
        (user) => user.username === action.data.username
      );

      if (enableUserIndex !== -1) {
        state.users.splice(enableUserIndex, 1, action.data);
      }

      return { ...state, enableUserError: null };
    case ENABLEUSERERROR:
      return { ...state, enableUserError: action?.data };
    case DISABLEUSER:
      const disableUserIndex = state.users.findIndex(
        (user) => user.username === action.data.username
      );

      if (disableUserIndex !== -1) {
        state.users.splice(disableUserIndex, 1, action.data);
      }

      return { ...state, disableUserError: null };
    case DISABLEUSERERROR:
      return { ...state, disableUserError: action?.data };
    case IMPORTUSER:
      state.users.unshift(action.data);

      return { ...state, importError: null };
    case IMPORTUSERERROR:
      return { ...state, importError: action?.data };
    case EXPORTCSV:
      return { ...state, exportData: action?.data };
    case UPDATEUSERNETSUITEID:
      const netsuiteIndex = state.users.findIndex(
        (user) => user.username === action.data.username
      );
      const newData = {
        ...state.users[netsuiteIndex],
        awsNetsuiteId: action.data.netsuiteCustomerId,
      };

      if (netsuiteIndex !== -1) {
        state.users.splice(netsuiteIndex, 1, newData);
      }

      return { ...state, linkError: null };
    case SYNCCUSTOMPRICING:
      return { ...state, syncCustomPricingError: null };
    case SYNCCUSTOMPRICINGERROR:
      return { ...state, syncCustomPricingError: { msg: action.data } };
    case SYNCPRODUCTS:
      return { ...state, syncProductsError: null };
    case SYNCPRODUCTSERROR:
      return { ...state, syncProductsError: { msg: action.data } };
    case CREATESUBACCOUNT:
      state.users.push(action.data);

      return { ...state, createSubAccountError: null };
    case CREATESUBACCOUNTERROR:
      return { ...state, createSubAccountError: action.data };
    case GETCUSTOMPRODUCTNETSUITE:
      return { ...state, customProductNetsuite: action.data };
    case UPSERTCUSTOMPRODUCTNETSUITE:
      const { productId, price } = action.data;
      const upsertIndex = state.customProductNetsuite.findIndex(
        (product) => product.item.id === productId
      );

      if (upsertIndex !== -1) {
        const newData = state.customProductNetsuite[upsertIndex];
        state.customProductNetsuite.splice(upsertIndex, 1, {
          ...newData,
          price,
          item: { ...newData.item, id: productId },
        });
      } else {
        const addData = {
          price,
          item: {
            id: productId,
          },
        };
        state.customProductNetsuite.push(addData);
      }

      return { ...state, upsertError: null };
    case UPSERTCUSTOMPRODUCTNETSUITEERROR:
      return { ...state, upsertError: action.data, removeCustomError: null };
    case REMOVECUSTOMPRODUCTNETSUITE:
      const removedCustomNetsuite = state.customProductNetsuite.filter(
        (product) => product.item.id !== action.data.productId
      );

      return { ...state, customProductNetsuite: removedCustomNetsuite };
    case REMOVECUSTOMPRODUCTNETSUITEERROR:
      return { ...state, removeCustomError: action.data, upsertError: null };
    case GETORDERLOGS: {
      return { ...state, logs: action.data };
    }
    case GETPRODUCTQUEUE:
      return { ...state, productQueue: action.data };
    case UPSERTPRODUCTTOQUEUE:
      const { id, name, category, oldPrice, newPrice } = action.data;

      const PQUpsertIndex = state.productQueue.findIndex(
        (product) => product.id === id
      );

      if (PQUpsertIndex !== -1) {
        //
        const newProductQueueItem = state.productQueue[PQUpsertIndex];

        state.productQueue.splice(PQUpsertIndex, 1, {
          ...newProductQueueItem,
          newPrice: newPrice,
        });
      } else {
        //does not exist
        state.productQueue.push({
          id,
          name,
          category,
          oldPrice,
          newPrice,
        });
      }

      return { ...state };
    case GETAUTOMATIONDATE:
      const { minutes, hours, dayOfWeek } = action.data;

      return {
        ...state,
        cronMinutes: minutes,
        cronHours: hours,
        cronDayOfWeek: dayOfWeek,
      };
    case SETAUTOMATIONDATE:
      const { newMinutes, newHours, newDayOfWeek } = action.data;

      return {
        ...state,
        cronMinutes: minutes,
        cronHours: hours,
        cronDayOfWeek: dayOfWeek,
      };
    case GETGROUPPRICING:
      return { ...state, groupPricingList: action.data };
    case CREATEGROUPPRICING:
      state.groupPricingList.push(action.data);

      return { ...state, createGroupPricingError: null };
    case ADDGROUPPRICINGPRODUCT:
      const groupIndex = state.groupPricingList.findIndex(
        (group) => group.id === action.data.groupPricingId
      );

      if (groupIndex !== -1) {
        state.groupPricingList[groupIndex].pricingList.push(
          action.data.product
        );
      }

      return { ...state, addGroupPricingProductError: null };
    case EDITGROUPPRICINGPRODUCT:
      const groupEditIndex = state.groupPricingList.findIndex(
        (group) => group.id === action.data.groupPricingId
      );

      if (groupEditIndex !== -1) {
        const groupEditProductIndex = state.groupPricingList[
          groupEditIndex
        ].pricingList.findIndex(
          (product) => product.productId === action.data.productId
        );

        if (groupEditProductIndex !== -1) {
          const newPricingProduct =
            state.groupPricingList[groupEditIndex].pricingList[
              groupEditProductIndex
            ];

          state.groupPricingList[groupEditIndex].pricingList.splice(
            groupEditProductIndex,
            1,
            {
              ...newPricingProduct,
              price: action.data.product.price,
            }
          );
        }
      }

      return { ...state, editGroupPricingProductError: null };
    case DELETEGROUPPRICINGPRODUCT:
      const groupDeleteIndex = state.groupPricingList.findIndex(
        (group) => group.id === action.data.groupPricingId
      );

      if (groupDeleteIndex !== -1) {
        const groupNewPricingList = state.groupPricingList[
          groupDeleteIndex
        ].pricingList.filter(
          (product) => product.productId !== action.data.productId
        );

        state.groupPricingList.splice(groupDeleteIndex, 1, {
          ...state.groupPricingList[groupDeleteIndex],
          pricingList: groupNewPricingList,
        });
      }

      return { ...state, deleteGroupPricingProductError: null };
    default:
      return state;
  }
};

export default adminReducer;
