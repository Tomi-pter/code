import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_BACKEND_URL });
// const user = JSON.parse(localStorage.getItem('profile'));

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        const token = JSON.parse(localStorage.getItem('profile')).accessToken;
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const logIn = (formData) => API.post('/login', formData);
export const signUp = (formData) => API.post('/signup', formData);
export const changePassword = (username, formData) => API.put(`/user/${username}/change-password`, formData);
export const confirmForgotPassword = (username, formData) => API.post(`/user/${username}/confirm-password`, formData);
export const forgotPassword = (username) => API.post(`/user/${username}/forgot-password`);

export const getCountries = () => API.get(`/countries`);
export const getStates = (countryCode) => API.get(`/states?countryCode=${countryCode}`);

export const verifyAccount = (formData) => API.post(`/user/${formData.email}/verify?code=${formData.code}`);
export const resendCode = (email) => API.post(`/user/${email}/resend-verification`);

export const logOut = (username) => API.post(`/user/${username}/logout`);
export const getAccount = (username) => API.get(`/user/${username}`);
export const getNetsuiteAccount = (username) => API.get(`/customers/${username}`);
export const getOrders = (username, status, page) => API.get(`/${username}/orders?` + (page ? `page=${page}` : '') + (status ? `&status=${status}` : ''));

export const putAccount = (username, accountData) => API.put(`/user/${username}`, accountData);
export const updateEmail = (username, formData) => API.put(`/user/${username}/change-email`, formData);

export const addAddresses = (username, formData) => API.post(`/user/${username}/addresses`, formData);
export const getAllAddresses = (username) => API.get(`/user/${username}/addresses`);
export const getAddressesById = (username, id) => API.get(`/user/${username}/addresses/${id}`);
export const deleteAddressesById = (username, id) => API.delete(`/user/${username}/addresses/${id}`);
export const updateAddressesById = (username, id, formData) => API.put(`/user/${username}/addresses/${id}`, formData);
export const makeDefaultAddress = (username, id) => API.put(`/user/${username}/addresses/${id}/default`);

export const getProducts = (name, category, sortBy, sortOrder, page, stockSort) => API.get("/products?" + (name ? `name=${name}` : '') + (category ? `category=${category}` : '') + (sortBy ? `&sortBy=${sortBy}&order=${sortOrder}` : '') + (page ? `&page=${page}` : '') + (stockSort ? '&stockSort=true' : '&stockSort=false'));
export const getFavoriteProducts = (username, name, sortBy, sortOrder, page, stockSort) => API.get(`/products/${username}/favorites` + (sortBy || page || name ? '?' : '') + (name ? `name=${name}` : '') + (name && sortBy ? '&' : '')  + (sortBy ? `sortBy=${sortBy}&order=${sortOrder}` : '') + (sortBy && page ? '&' : '') + (page ? `page=${page}` : '') + (stockSort ? '&stockSort=true' : '&stockSort=false'));
export const getProduct = (id) => API.get(`/products/${id}`);
export const getRequestPrice = (username) => API.get(`/user/${username}/request-pricing`);
export const requestStock = (username, formData) => API.post(`/user/${username}/request-stock`, formData);

export const getSearch = (name) => API.get("/products?" + (name ? `name=${name}` : ''));

export const getCart = (username) => API.get(`/cart/${username}`);
export const getCount = (username) => API.get(`/cart/${username}/count`);
export const addCart = (username, product) => API.post(`/cart/${username}/add`, product);
export const updateCart = (username, product) => API.put(`/cart/${username}/update`, product);
export const removeCart = (username, productId) => API.post(`/cart/${username}/remove`, { productId });
export const discount = (discountCode) => API.get(`/coupon?code=${discountCode}`);

export const getCards = (username) => API.get(`/square/customers/${username}`);
export const addCard = (username, formData) => API.post(`/${username}/cards`, formData);
export const removeCard = (username, id) => API.delete(`/${username}/cards/${id}`);

export const getDefaultCard = (username) => API.get(`/cards/${username}/default-payment-method`);
export const setDefaultCard = (username, body) => API.post(`/cards/${username}/default-payment-method`, body);

export const payment = (username, formData) => API.post(`/${username}/payment`, formData);
export const paymentByTerms = (username, formData) => API.post(`/${username}/pay-by-terms`, formData);

// UPLOAD AVATAR
export const getAvatar = (username) => API.get(`/user/${username}/photo`);
export const postAvatar = (username, image) => API.post(`/user/${username}/photo`, image);

// ADMIN
export const getUsers = () => API.get(`/admin/users`);
export const getCustomProducts = (username) => API.get(`/custom-price/${username}`);
export const createCustomProduct = (formData) => API.post(`/custom-price/create`, formData);
export const updateCustomProduct = (id, formData) => API.put(`/custom-price/${id}`, formData);
export const removeCustomProduct = (id) => API.delete(`/custom-price/${id}`);
export const loginAdminUser = (formData) => API.post(`/admin/login-as-user`, formData);
export const loginAdmin = (formData) => API.post(`/admin/login`, formData);
export const confirmUser = (formData) => API.post(`/admin/confirm-user`, formData);
export const importUser = (formData) => API.post(`/admin/import-customer`, formData);
export const exportCSV = () => API.get(`/custom-price/export`);
export const updateUserNetsuiteID = (username, formData) => API.put(`/admin/${username}/netsuite-id`, formData)

// PRODUCTS v2
export const getProductsv2 = () => API.get(`/products`);
export const getProductv2 = (productId) => API.get(`/products/${productId}`);
export const getFavProductsv2 = (username) => API.get(`/products/${username}/favorites`);
