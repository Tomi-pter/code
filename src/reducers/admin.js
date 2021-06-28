import { GETUSERS, GETCUSTOMPRODUCTS, RESETCUSTOMPRODUCTS } from '../constants/actionTypes';

const adminReducer = (state = { users: [], customProducts: [] }, action) => {
  switch (action.type) {
    case GETUSERS:

        return {...state, users: action.data.Users};
    case GETCUSTOMPRODUCTS:

        return {...state, customProducts: action.data}
    case RESETCUSTOMPRODUCTS:

        return {...state, customProducts: [] }
    default:
        return state;
  }
};

export default adminReducer;