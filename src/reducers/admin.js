import {
  GETUSERS,
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
  GETCUSTOMPRODUCTNETSUITEERROR,
  UPSERTCUSTOMPRODUCTNETSUITEERROR,
  REMOVECUSTOMPRODUCTNETSUITEERROR,
  GETORDERLOGS,
  GETPRODUCTQUEUE,
  UPSERTPRODUCTTOQUEUE,
  GETAUTOMATIONDATE,
  SETAUTOMATIONDATE,
} from "../constants/actionTypes";

const adminReducer = (
  state = { users: [], customProducts: null, customProductNetsuite: [], logs: [], productQueue: [], cronMinutes: null, cronHours: null, cronDayOfWeek: null },
  action
) => {
  switch (action.type) {
    case GETUSERS:
      return { ...state, users: action.data.Users };
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
        return { ...state, logs: action.data }
    }
    case GETPRODUCTQUEUE:
        return { ...state, productQueue: action.data }
    case UPSERTPRODUCTTOQUEUE:
        const { id, name, category, oldPrice, newPrice } = action.data

        const PQUpsertIndex = state.productQueue.findIndex(
            (product) => product.id === id
        )

        if (PQUpsertIndex !== -1) {//
            const newProductQueueItem = state.productQueue[PQUpsertIndex]

            state.productQueue.splice(
                PQUpsertIndex,
                1,
                { 
                    ...newProductQueueItem,
                    newPrice: newPrice
                }
            )
        }
        else {//does not exist 
            state.productQueue.push({
                id,
                name,
                category,
                oldPrice,
                newPrice
            })
        }

        return { ...state }
    case GETAUTOMATIONDATE:
        const { minutes, hours, dayOfWeek } = action.data

        return { ...state, cronMinutes: minutes, cronHours: hours, cronDayOfWeek: dayOfWeek }
    case SETAUTOMATIONDATE:
        const { newMinutes, newHours, newDayOfWeek } = action.data
        
        return { ...state, cronMinutes: minutes, cronHours: hours, cronDayOfWeek: dayOfWeek }
    default:
      return state;
  }
};

export default adminReducer;
