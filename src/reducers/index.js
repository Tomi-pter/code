import { combineReducers } from 'redux';

import auth from './auth';
import account from './account';
import products from './products';
import cart from './cart';
import cards from './cards';
import payment from './payment';
import search from './search';

export const reducers = combineReducers({ auth, account, products, cart, cards, payment, search });