import axios from 'axios';

const API = axios.create({ baseURL: 'https://premierpharmastaging.outliant.com/' });

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

export const getProducts = () => API.get('/products');