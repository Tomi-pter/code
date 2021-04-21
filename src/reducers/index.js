import { combineReducers } from 'redux';

import auth from './auth';
import account from './account';
import products from './products';
import cart from './cart';

export const reducers = combineReducers({ auth, account, products, cart });
