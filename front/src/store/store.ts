import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import userReducer from './reducers/userReducer'
import uiReducer from './reducers/uiReducer'
const initialState = {};
const middleware = [thunk];
//this is for redux devtool purpose
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
  }
}
const reducer = combineReducers({
  user: userReducer,//user key ma store gareko
  UI: uiReducer
});
const store = createStore(reducer, initialState, compose(applyMiddleware(…middleware), (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) as any));
export default store;