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

export const getProducts = (name, category, subCategory) => API.get("/products?" + (name ? `name=${name}` : '') + (category ? `category=${category}` : '') + (subCategory ? `&subCategory=${subCategory}` : ''));

export const getCart = () => JSON.parse(localStorage.getItem('cart'));
export const addCart = (product, quantity) => {
  const cart = JSON.parse(localStorage.getItem('cart'));
  const newItem = {productId: product.id, productName: product.description, price: product.purchasePrice, quantity};
  const index = cart.findIndex(item => item.productId === product.id);
  index !== -1 ? cart[index].quantity += quantity : cart.push(newItem);
  localStorage.setItem('cart', JSON.stringify(cart));
  return cart;
};
export const removeCart = (id) => {
  const cart = JSON.parse(localStorage.getItem('cart'));
  const newCart = cart.filter(item => item.productId !== id);
  localStorage.setItem('cart', JSON.stringify(newCart));
  return newCart;
};