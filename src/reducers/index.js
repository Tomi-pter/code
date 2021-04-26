import { combineReducers } from 'redux';

import auth from './auth';
import account from './account';
import products from './products';
import cart from './cart';
import paymentMethods from './paymentMethods';
import payment from './payment';

export const reducers = combineReducers({ auth, account, products, cart, paymentMethods, payment });
