// @flow

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import * as Promise from 'bluebird';
import electronJsonStorage from 'electron-json-storage';
import { Iterable, fromJS } from 'immutable';
import history from 'app/utils/history';
import API from 'app/utils/xhrWrapper';
import setTheme from 'app/utils/setTheme';
import persistReduxState from 'app/utils/persistReduxState';
import createRootReducer from '../reducers';
import sagas from '../sagas';

const storage = Promise.promisifyAll(electronJsonStorage);
const rootReducer = createRootReducer(history);
const sagaMiddleware = createSagaMiddleware();
const configureStore = async () => {
  const initialState = await storage.getAsync('redux');
  const middleware = [
    sagaMiddleware,
    thunk.withExtraArgument(API),
    routerMiddleware(history),
  ];
  if (process.env.NODE_ENV !== 'test') {
    const stateTransformer = (state) => {
      if (Iterable.isIterable(state)) {
        return state.toJS();
      }
      return state;
    };
    middleware.push(createLogger({
      level: 'info',
      collapsed: true,
      stateTransformer,
    }));
  }
  const store = createStore(
    rootReducer,
    fromJS(initialState),
    applyMiddleware(...middleware),
  );
  sagaMiddleware.run(sagas);
  store.subscribe(() => {
    persistReduxState(store);
  });
  if (module.hot) {
    module.hot.accept(
      '../reducers',
      () => store.replaceReducer(require('../reducers').default), // eslint-disable-line
    );
  }
  setTheme(store);
  return store;
};

export default { configureStore, history };
