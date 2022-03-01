import { GETPRODUCTS, ERRORGETPRODUCTS, GETSEARCH, REQUESTSTOCK, REQUESTSTOCKERROR, GETREQUESTPRICE } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const getProducts = (name, category, sortBy, sortOrder, page, stockSort) => async(dispatch) => {
    try {
        const { data } = await api.getProducts(name, category, sortBy, sortOrder, page, stockSort);
        dispatch({ type: GETPRODUCTS, payload: data });

    } catch (error) {
        dispatch({ type: GETPRODUCTS, payload: {count: 0, products: []} });
        // console.log('Error get products', error.message);
    }
};

export const getFavoriteProducts = (username, name, sortBy, sortOrder, page, stockSort) => async(dispatch) => {
    try {

        const { data } = await api.getFavoriteProducts(username, name, sortBy, sortOrder, page, stockSort);

        dispatch({ type: GETPRODUCTS, payload: data });

    } catch (error) {
        dispatch({ type: GETPRODUCTS, payload: {count: 0, products: []} });
        // console.log('Error get products', error.message);
    }
};

export const getProduct = (id) => async(dispatch) => {
    try {
        const { data } = await api.getProduct(id);
        
        dispatch({ type: GETPRODUCTS, payload: {products: [data]} });

    } catch (error) {

        dispatch({ type: ERRORGETPRODUCTS, payload: error.response})
        
    }
};

export const getSearch = (name) => async(dispatch) => {
    try {
        const { data } = await api.getSearch(name);

        dispatch({ type: GETSEARCH, payload: data });

    } catch (error) {
        console.log(error.message);
    }
};

export const requestStock = (username, formData) => async(dispatch) => {
    try {
        const { data } = await api.requestStock(username, formData);

        dispatch({ type: REQUESTSTOCK, payload: {...formData, lastRequested: new Date().getTime()} });

    } catch (error) {
        dispatch({ type: REQUESTSTOCKERROR, payload: {message: error.message }});
    }
};

export const getRequestPrice = (username) => async(dispatch) => {
    try {
        const { data } = await api.getRequestPrice(username);

        dispatch({ type: GETREQUESTPRICE, payload: data.products });

    } catch (error) {
        console.log(error.message);
    }
};