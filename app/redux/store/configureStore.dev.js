// @flow

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import * as Promise from 'bluebird';
import isEqual from 'lodash/isEqual';
import electronJsonStorage from 'electron-json-storage';
import { Iterable, fromJS } from 'immutable';
import API from 'app/utils/xhr_wrapper';
import createRootReducer from '../reducers';
import sagas from '../sagas';

const storage = Promise.promisifyAll(electronJsonStorage);
const history = createHashHistory();
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
    const SettingsState = store.getState()
      .get('Settings')
      .toJS();
    storage.get('redux', (error, data) => {
      if (!isEqual(data, SettingsState)) {
        storage.set('redux', { Settings: SettingsState });
      }
    });
  });
  if (module.hot) {
    module.hot.accept(
      '../reducers',
      () => store.replaceReducer(require('../reducers').default), // eslint-disable-line
    );
  }
  return store;
};

export default { configureStore, history };
