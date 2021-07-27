import 
{   GETUSERS, 
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
    IMPORTUSERERROR
} from '../constants/actionTypes';

const adminReducer = (state = { users: [], customProducts: [] }, action) => {
  switch (action.type) {
    case GETUSERS:

        return {...state, users: action.data.Users};
    case GETCUSTOMPRODUCTS:

        return {...state, customProducts: action.data, loginError: false}
    case RESETCUSTOMPRODUCTS:

        return {...state, customProducts: [] }
    case CREATECUSTOMPRODUCT:
        state.customProducts.push(action.data)

        return {...state, error: null }
    case CUSTOMPRODUCTERROR:

        return{...state, error: action.data}
    case UPDATECUSTOMPRODUCT:
        const index = state.customProducts.findIndex(product => product.customPricingId  === action.data.customPricingId);
        if(index !== -1) {
            state.customProducts.splice(index, 1, action.data);
        }

        return { ...state, error: null};
    case REMOVECUSTOMPRODUCT:
        const newCustomProducts = state.customProducts.filter((product) => product.customPricingId !== action.id)
      
        return { ...state, customProducts: newCustomProducts };
    case LOGINADMINUSER:
        if (action?.data?.success && action?.data?.AuthenticationResult?.AccessToken) {
          localStorage.setItem("profile", JSON.stringify({ ...action?.data, accessToken: action?.data?.AuthenticationResult?.AccessToken }));
        }
        return { ...state, authData: { ...action?.data, accessToken: action?.data?.AuthenticationResult?.AccessToken }, loginError: false };
    case LOGINERROR: 
    
        return { ...state, loginError: true };
    case LOGINADMIN: 
        localStorage.setItem("admin", JSON.stringify(action?.data));

        return { ...state, adminAuthData: action?.data, adminLoginError: null}
    case LOGINADMINERROR:

        return { ...state, adminLoginError: action?.data}
    case CONFIRMUSER:
        const userIndex = state.users.findIndex(user => user.Username  === action.data.Username);

        if(userIndex !== -1) {
            state.users.splice(userIndex, 1, action.data);
        }

        return { ...state, confirmError: null }
    case CONFIRMUSERERROR:

        return { ...state, confirmError: action?.data}
    case IMPORTUSER:
        state.customProducts.push(action.data)

        return {...state, importError: null }
    case IMPORTUSERERROR:

        return { ...state, importError: action?.data}
    default:
        return state;
  }
};

export default adminReducer;