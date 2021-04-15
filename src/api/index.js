import axios from 'axios';

const API = axios.create({ baseURL: 'http://premierpharmastaging-env.eba-n2wzj3tj.us-west-2.elasticbeanstalk.com/' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

export const logIn = (formData) => API.post('/login', formData);
export const signUp = (formData) => API.post('/signup', formData);
