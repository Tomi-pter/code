import { combineReducers } from 'redux';

import auth from './auth';
import account from './account';

export const reducers = combineReducers({ auth, account });
