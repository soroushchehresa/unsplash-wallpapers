// @flow

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import isEqual from 'lodash/isEqual';
import * as Promise from 'bluebird';
import electronJsonStorage from 'electron-json-storage';
import { fromJS } from 'immutable';
import API from 'app/utils/xhr_wrapper';
import history from 'app/utils/history';
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
    const reduxState = (store.getState()).toJS();
    storage.get('redux', (error, data) => {
      if (!isEqual(data, reduxState)) {
        const { Settings, Categories, Home } = reduxState;
        storage.set('redux', {
          Settings,
          Categories,
          Home: {
            photoData: Home.photoData,
          },
        });
      }
    });
  });
  return store;
};

export default { configureStore, history };
