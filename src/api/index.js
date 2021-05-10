import axios from 'axios';

const API = axios.create({ baseURL: 'https://premierpharmastaging.outliant.com/' });
// const user = JSON.parse(localStorage.getItem('profile'));

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

export const logIn = (formData) => API.post('/login', formData);
export const signUp = (formData) => API.post('/signup', formData);
export const verifyAccount = (formData) => API.post(`/user/${formData.email}/verify?code=${formData.code}`);
export const resendCode = (email) => API.post(`/user/${email}/resend-verification`);

export const logOut = (username) => API.post(`/user/${username}/logout`);
export const getAccount = (username) => API.get(`/user/${username}`);
export const getOrders = (username) => API.get(`/${username}/orders`);

// EDIT ACCOUNT
export const putAccount = (username, accountData) => API.put(`/user/${username}`, accountData);

export const getProducts = (name, category, subCategory) => API.get("/products?" + (name ? `name=${name}` : '') + (category ? `category=${category}` : '') + (subCategory ? `&subCategory=${subCategory}` : ''));
export const getProduct = (id) => API.get(`/products/${id}`);

export const getCart = (username) => API.get(`/cart/${username}`);
export const addCart = (username, product) => API.post(`/cart/${username}/add`, product);
export const updateCart = (username, product) => API.put(`/cart/${username}/update`, product);
export const removeCart = (username, productId) => API.post(`/cart/${username}/remove`, {productId});
export const discount = (discountCode) => API.get(`/coupons?code=${discountCode}`);

export const getCards = (username) => API.get(`/cards/${username}`);
export const addCard = (username, paymentMethod) => API.post(`/cards/${username}/add-payment-method`, paymentMethod);
export const getDefaultCard = (username) => API.get(`/customer/${username}`);
export const setDefaultCard = (username, body) => API.put(`/cards/${username}/default-payment-method`, body);

export const payment = (username, formData) => API.post(`/user/${username}/payment`, formData);

// UPLOAD AVATAR 
export const getAvatar = (username) => API.get(`/user/${username}/photo`);
export const postAvatar = (username, image) => API.post(`/user/${username}/photo`, image);