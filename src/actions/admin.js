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
    CONFIRMUSERERROR
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
        const { data } = await api.removeCustomProduct(id);
        
        dispatch({ type: REMOVECUSTOMPRODUCT, id });
    } catch (error) {
        console.log(error);
    }
};

export const loginAdminUser = (formData, profile) => async (dispatch) => {
    try {
        if (profile) {
            await api.logOut(profile.username);
            localStorage.removeItem('profile');
        }
        
        const { data } = await api.loginAdminUser(formData);
        
        dispatch({ type: LOGINADMINUSER, data });

        window.open("/shop", "_blank");
    } catch (error) {
        // console.log(error);
        dispatch({ type: LOGINERROR });
    }
};

export const loginAdmin = (formData, route) => async (dispatch) => {
    try {
        const { data } = await api.loginAdmin(formData);
        
        dispatch({ type: LOGINADMIN, data });

        route.push("/admin");
    } catch (error) {
        // console.log(error);
        const { data } = error.response
        dispatch({ type: LOGINADMINERROR, data });
    }
};

export const confirmUser = (formData, user) => async (dispatch) => {
    try {
        await api.confirmUser(formData);

        const data = {...user, UserStatus: 'CONFIRMED'}
        
        dispatch({ type: CONFIRMUSER, data });
    } catch (error) {
        console.log(error);
        // const { data } = error.response
        const data = {success: false}
        dispatch({ type: CONFIRMUSERERROR, data });
    }
};