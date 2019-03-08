import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import API from 'app/utils/xhr_wrapper';
import createRootReducer from './reducers';
import sagas from './sagas';

const history = createHashHistory();
const rootReducer = createRootReducer(history);
const sagaMiddleware = createSagaMiddleware();
const configureStore = (initialState?) => {
  const middleware = [
    sagaMiddleware,
    thunk.withExtraArgument(API),
    routerMiddleware(history)
  ];
  if (process.env.NODE_ENV !== 'test') {
    middleware.push(createLogger({
      level: 'info',
      collapsed: true
    }));
  }
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  );

  sagaMiddleware.run(sagas);

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
