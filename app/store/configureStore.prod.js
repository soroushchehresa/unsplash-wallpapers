// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import API from 'app/utils/xhr_wrapper';
import createRootReducer from './reducers';
import sagas from './sagas';

const history = createHashHistory();
const rootReducer = createRootReducer(history);
const sagaMiddleware = createSagaMiddleware();
const enhancer = applyMiddleware(
  thunk.withExtraArgument(API),
  routerMiddleware(history),
  sagaMiddleware
);

function configureStore(initialState?) {
  const store = createStore(rootReducer, initialState, enhancer);
  sagaMiddleware.run(sagas);
  return store;
}

export default { configureStore, history };
