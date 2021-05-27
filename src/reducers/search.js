import { GETSEARCH } from '../constants/actionTypes';

export default (search = [], action) => {
    switch (action.type) {
        case GETSEARCH:
            return action.payload;
        default:
            return search;
    }
};