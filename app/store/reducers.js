// @flow
import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router';
import Main from 'app/containers/Main/redux';

export default (history: History) => {
  return combineReducers({
    router: connectRouter(history),
    Main
  });
}
