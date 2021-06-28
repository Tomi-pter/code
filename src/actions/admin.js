import {
    GETUSERS,
    GETCUSTOMPRODUCTS,
    RESETCUSTOMPRODUCTS
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