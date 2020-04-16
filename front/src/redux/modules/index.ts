import { combineReducers } from 'redux';
import base from './base';
import auth from './auth';
import user from './user';
import perfume from './perfume'
import { penderReducer } from 'redux-pender';

export default combineReducers({
    base,
    auth,
    user,
    perfume,
    pender: penderReducer
});