import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import modules from './modules';
import penderMiddleware from 'redux-pender';


const configureStore = () => {
  const store = createStore(modules, composeWithDevTools(
    applyMiddleware(penderMiddleware())
  ));
  return store;
}

export default configureStore;