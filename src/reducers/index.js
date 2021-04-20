import { combineReducers } from 'redux';

import auth from './auth';
import account from './account';
import products from './products';

export const reducers = combineReducers({ auth, account, products });
