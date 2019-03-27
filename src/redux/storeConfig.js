import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';
import rootReducer from './ducks/index';
import clientMiddleware from './middlewares/clientMiddleware';

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const configureStore = initialState => {
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk, clientMiddleware(axios)))
  );

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./ducks', () => store.replaceReducer(rootReducer));
  }

  return store;
};

export default configureStore;
