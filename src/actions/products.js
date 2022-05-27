import {
  GETPRODUCTS,
  ERRORGETPRODUCTS,
  GETSEARCH,
  REQUESTSTOCK,
  REQUESTSTOCKERROR,
  GETREQUESTPRICE,
  GETPRODUCTSV2,
  GETFAVPRODUCTSV2,
  GETPREFERRED,
  ADDPREFERRED,
  ADDPREFERREDERROR,
  REMOVEPREFERRED,
  REMOVEPREFERREDERROR,
} from "../constants/actionTypes";

import * as api from "../api/index.js";

export const getProducts =
  (name, category, sortBy, sortOrder, page, stockSort) => async (dispatch) => {
    try {
      const { data } = await api.getProducts(
        name,
        category,
        sortBy,
        sortOrder,
        page,
        stockSort
      );
      dispatch({ type: GETPRODUCTS, payload: data });
    } catch (error) {
      dispatch({ type: GETPRODUCTS, payload: { count: 0, products: [] } });
      // console.log('Error get products', error.message);
    }
  };

export const getFavoriteProducts =
  (username, name, sortBy, sortOrder, page, stockSort) => async (dispatch) => {
    try {
      const { data } = await api.getFavoriteProducts(
        username,
        name,
        sortBy,
        sortOrder,
        page,
        stockSort
      );

      dispatch({ type: GETPRODUCTS, payload: data });
    } catch (error) {
      dispatch({ type: GETPRODUCTS, payload: { count: 0, products: [] } });
      // console.log('Error get products', error.message);
    }
  };

export const getProduct = (id) => async (dispatch) => {
  try {
    const { data } = await api.getProduct(id);

    dispatch({ type: GETPRODUCTS, payload: { products: [data] } });
  } catch (error) {
    dispatch({ type: ERRORGETPRODUCTS, payload: error.response });
  }
};

export const getSearch = (name) => async (dispatch) => {
  try {
    const { data } = await api.getSearch(name);

    dispatch({ type: GETSEARCH, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const requestStock = (username, formData) => async (dispatch) => {
  try {
    const { data } = await api.requestStock(username, formData);

    dispatch({
      type: REQUESTSTOCK,
      payload: { ...formData, lastRequested: new Date().getTime() },
    });
  } catch (error) {
    dispatch({ type: REQUESTSTOCKERROR, payload: { message: error.message } });
  }
};

export const getRequestPrice = (username) => async (dispatch) => {
  try {
    const { data } = await api.getRequestPrice(username);

    dispatch({ type: GETREQUESTPRICE, payload: data.products });
  } catch (error) {
    console.log(error.message);
  }
};

export const getProductsv2 = () => async (dispatch) => {
  try {
    const { data } = await api.getProductsv2();

    dispatch({ type: GETPRODUCTSV2, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getFavProductsv2 = (username) => async (dispatch) => {
  try {
    const { data } = await api.getFavProductsv2(username);

    dispatch({ type: GETFAVPRODUCTSV2, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getProductv2 = (id) => async (dispatch) => {
  try {
    const { data } = await api.getProductv2(id);

    dispatch({ type: GETPRODUCTSV2, payload: data });
  } catch (error) {
    dispatch({ type: ERRORGETPRODUCTS, payload: error.response });
  }
};

export const getPreferred = (username) => async (dispatch) => {
  try {
    const { data } = await api.getPreferred(username);

    dispatch({ type: GETPREFERRED, payload: data.items });
  } catch (error) {
    dispatch({ type: GETPREFERRED, payload: [] });
  }
};

export const addPreferred = (username, formData) => async (dispatch) => {
  try {
    const { data } = await api.addPreferred(username, formData);

    dispatch({ type: ADDPREFERRED, payload: data.items });
  } catch (error) {
    dispatch({ type: ADDPREFERREDERROR, payload: error.response });
  }
};

export const removePreferred = (username, formData) => async (dispatch) => {
  try {
    const { data } = await api.removePreferred(username, formData);

    dispatch({ type: REMOVEPREFERRED, payload: data.items });
  } catch (error) {
    dispatch({ type: REMOVEPREFERREDERROR, payload: error.reponse });
  }
};
