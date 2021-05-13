import { GETPRODUCTS } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const getProducts = (name, category, subCategory, sortBy) => async(dispatch) => {
    try {
        const { data } = await api.getProducts(name, category, subCategory, sortBy);

        dispatch({ type: GETPRODUCTS, payload: data });

    } catch (error) {
        console.log(error.message);
    }
};

export const getProduct = (id) => async(dispatch) => {
    try {
        const { data } = await api.getProduct(id);

        dispatch({ type: GETPRODUCTS, payload: [data] });

    } catch (error) {
        console.log(error.message);
    }
};