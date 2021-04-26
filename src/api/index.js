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
export const logOut = (email) => API.post(`/user/${email}/logout`);
export const signUp = (formData) => API.post('/signup', formData);
export const verifyAccount = (formData) => API.post(`/user/${formData.email}/verify?code=${formData.code}`);
export const resendCode = (email) => API.post(`/user/${email}/resend-verification`);
export const getAccount = (email) => API.get(`/user/${email}`);

export const getProducts = (name, category, subCategory) => API.get("/products?" + (name ? `name=${name}` : '') + (category ? `category=${category}` : '') + (subCategory ? `&subCategory=${subCategory}` : ''));
export const getProduct = (id) => API.get(`/products/${id}`);

export const getCart = (email) => API.get(`/cart/${email}`);
export const addCart = (email, product) => API.post(`/cart/${email}/add`, product);
export const removeCart = (email, productId) => API.post(`/cart/${email}/remove`, {productId});

export const getPaymentMethods = (username) => API.get(`/cards/${username}`);
export const addPaymentMethod = (username, paymentMethod) => API.post(`/cards/${username}/add-payment-method`, paymentMethod);

export const payment = (username, formData) => API.post(`/${username}/payment`, formData);