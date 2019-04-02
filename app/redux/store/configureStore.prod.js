// @flow

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import * as Promise from 'bluebird';
import electronJsonStorage from 'electron-json-storage';
import { fromJS } from 'immutable';
import API from 'app/utils/xhrWrapper';
import setTheme from 'app/utils/setTheme';
import history from 'app/utils/history';
import persistReduxState from 'app/utils/persistReduxState';
import createRootReducer from '../reducers';
import sagas from '../sagas';

const storage = Promise.promisifyAll(electronJsonStorage);
const rootReducer = createRootReducer(history);
const sagaMiddleware = createSagaMiddleware();
const enhancer = applyMiddleware(
  thunk.withExtraArgument(API),
  routerMiddleware(history),
  sagaMiddleware,
);

const configureStore = async () => {
  const initialState = await storage.getAsync('redux');
  const store = createStore(
    rootReducer,
    fromJS(initialState),
    enhancer,
  );
  sagaMiddleware.run(sagas);
  store.subscribe(() => {
    persistReduxState(store);
  });
  setTheme(store);
  return store;
};

export default { configureStore, history };
