import { combineReducers } from 'redux';
import base from './base';
import auth from './auth';
import user from './user';
import perfume from './perfume'
import detail from './detail'
import { penderReducer } from 'redux-pender';

export default combineReducers({
    base,
    auth,
    user,
    perfume,
    detail,
    pender: penderReducer
});