// @flow

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import isEqual from 'lodash/isEqual';
import * as Promise from 'bluebird';
import electronJsonStorage from 'electron-json-storage';
import { fromJS } from 'immutable';
import API from 'app/utils/xhr_wrapper';
import createRootReducer from './reducers';
import sagas from './sagas';

const storage = Promise.promisifyAll(electronJsonStorage);
const history = createHashHistory();
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
    const SettingsState = store.getState()
      .get('Settings')
      .toJS();
    storage.get('redux', (error, data) => {
      if (!isEqual(data, SettingsState)) {
        storage.set('redux', { Settings: SettingsState });
      }
    });
  });
  return store;
};

export default { configureStore, history };
