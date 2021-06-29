import {
    GETUSERS,
    GETCUSTOMPRODUCTS,
    RESETCUSTOMPRODUCTS,
    CREATECUSTOMPRODUCT,
    UPDATECUSTOMPRODUCT,
    REMOVECUSTOMPRODUCT,
    LOGINADMINUSER
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
        console.log(error);
    }
};

export const updateCustomProduct = (id, formData) => async (dispatch) => {
    try {
        const { data } = await api.updateCustomProduct(id, formData);

        dispatch({ type: UPDATECUSTOMPRODUCT, data });
    } catch (error) {
        console.log(error);
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

export const loginAdminUser = (formData, router) => async (dispatch) => {
    try {
        console.log(formData);
        const { data } = await api.loginAdminUser(formData);

        console.log(data);
        
        // dispatch({ type: LOGINADMINUSER, data });

        // router.push("/account");
    } catch (error) {
        console.log(error);
    }
};