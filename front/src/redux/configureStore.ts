import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import modules from './modules';


const configureStore = () => {
  const store = createStore(modules, composeWithDevTools(
  ));
  return store;
}

export default configureStore;