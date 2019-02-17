import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import API from 'app/utils/xhr_wrapper';
import createRootReducer from './reducers';

const history = createHashHistory();

const rootReducer = createRootReducer(history);

const configureStore = (initialState?) => {
  // Redux Configuration
  const middleware = [];

  // Thunk Middleware
  middleware.push(thunk.withExtraArgument(API));

  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true
  });

  // Skip redux logs in console during the tests
  if (process.env.NODE_ENV !== 'test') {
    middleware.push(logger);
  }

  // Router Middleware
  const router = routerMiddleware(history);
  middleware.push(router);

  // Create Store
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  );

  if (module.hot) {
    module.hot.accept(
      './reducers',
      // eslint-disable-next-line global-require
      () => store.replaceReducer(require('./reducers').default)
    );
  }

  return store;
};

export default { configureStore, history };
